const axios = require('axios');

/**
 * OSRM (Open Source Routing Machine) es un motor de ruteo open-source.
 * Usamos el servidor demo público por defecto (sin necesidad de API key), pero
 * se recomienda auto-hospedar una instancia propia para producción, ya que el
 * servidor demo tiene límites de uso y no ofrece garantías de disponibilidad.
 * Ver: https://project-osrm.org/  |  Docker: https://hub.docker.com/r/osrm/osrm-backend
 */
const OSRM_BASE_URL = process.env.OSRM_BASE_URL || 'https://router.project-osrm.org';

/**
 * Obtiene varias rutas alternativas entre un origen y un destino usando OSRM.
 * @param {{lat:number,lng:number}} origen
 * @param {{lat:number,lng:number}} destino
 * @param {{conTramos?: boolean}} opciones  conTramos=true pide además a OSRM el detalle
 *        de cada segmento (nodos de OpenStreetMap, distancia y duración), que usa Dijkstra
 *        para armar el grafo de la red vial. Sin esta opción el resultado es el de siempre.
 * @returns {Promise<Array>} lista de rutas normalizadas
 */
async function obtenerRutasAlternativas(origen, destino, opciones = {}) {
  const { conTramos = false } = opciones;
  const coords = `${origen.lng},${origen.lat};${destino.lng},${destino.lat}`;
  const url = `${OSRM_BASE_URL}/route/v1/driving/${coords}`;

  try {
    const { data } = await axios.get(url, {
      params: {
        // Con conTramos se piden hasta 3 alternativas: más rutas = más cruces para Dijkstra
        alternatives: conTramos ? 3 : true,
        overview: 'full',
        geometries: 'polyline', // mismo formato de codificación que usa Google (precisión 5)
        steps: true,
        ...(conTramos ? { annotations: 'nodes,distance,duration' } : {}),
      },
      timeout: 10000,
    });

    if (data.code !== 'Ok' || !data.routes || data.routes.length === 0) {
      console.warn('OSRM respondió sin rutas válidas, usando datos simulados:', data.code);
      return simularRutas(origen, destino);
    }

    return data.routes.map((route, index) => {
      const coordenadas = decodificarPolyline(route.geometry);
      return {
        id: `ruta_${index + 1}`,
        resumen: nombrarRuta(route, index),
        distanciaKm: route.distance / 1000,
        duracionMin: route.duration / 60,
        polyline: route.geometry,
        puntosMuestra: extraerPuntosMuestra(coordenadas),
        // Nombres de vías reportados por OSM a lo largo de la ruta (para referencia)
        viasPrincipales: extraerNombresVias(route),
        ...(conTramos ? { tramos: extraerTramos(route, coordenadas) } : {}),
      };
    });
  } catch (error) {
    console.error('Error consultando OSRM:', error.message);
    return simularRutas(origen, destino);
  }
}

/**
 * Junta el detalle segmento a segmento de una ruta (solo cuando se pide conTramos).
 * OSRM devuelve, por cada tramo (leg), los ids de los nodos de OpenStreetMap que recorre
 * y la distancia (m) y duración (s) entre cada par de nodos consecutivos.
 */
function extraerTramos(route, coordenadas) {
  const nodos = [];
  const distancias = [];
  const duraciones = [];
  for (const leg of route.legs || []) {
    const a = leg.annotation;
    if (!a || !a.nodes) continue;
    for (const n of a.nodes) nodos.push(String(n));
    for (const d of a.distance || []) distancias.push(d);
    for (const t of a.duration || []) duraciones.push(t);
  }
  return { coordenadas, nodos, distancias, duraciones };
}

/** Genera un nombre descriptivo de la ruta a partir de los nombres de calle más frecuentes */
function nombrarRuta(route, index) {
  const nombres = extraerNombresVias(route);
  if (nombres.length > 0) {
    return `Ruta ${index + 1} (vía ${nombres[0]})`;
  }
  return `Ruta alternativa ${index + 1}`;
}

/** Extrae los nombres de vía (steps[].name) más largos/relevantes de la ruta OSRM */
function extraerNombresVias(route) {
  const nombres = route.legs
    .flatMap((leg) => leg.steps.map((s) => s.name))
    .filter((n) => n && n.trim().length > 0);
  // Deduplicar manteniendo orden
  return [...new Set(nombres)].slice(0, 3);
}

/** Toma 3 puntos representativos (inicio, medio, fin) de la ruta decodificada para muestrear clima/altitud */
function extraerPuntosMuestra(coordenadas) {
  if (!coordenadas || coordenadas.length === 0) return [];
  const inicio = coordenadas[0];
  const fin = coordenadas[coordenadas.length - 1];
  const medio = coordenadas[Math.floor(coordenadas.length / 2)];
  return [inicio, medio, fin];
}

/**
 * Decodifica una polyline codificada (formato estándar, precisión 5 — el mismo que usa OSRM y Google).
 * Referencia: https://developers.google.com/maps/documentation/utilities/polylinealgorithm
 */
function decodificarPolyline(encoded) {
  if (!encoded) return [];
  let index = 0;
  let lat = 0;
  let lng = 0;
  const puntos = [];

  while (index < encoded.length) {
    let b;
    let shift = 0;
    let result = 0;
    do {
      b = encoded.charCodeAt(index++) - 63;
      result |= (b & 0x1f) << shift;
      shift += 5;
    } while (b >= 0x20);
    const dlat = result & 1 ? ~(result >> 1) : result >> 1;
    lat += dlat;

    shift = 0;
    result = 0;
    do {
      b = encoded.charCodeAt(index++) - 63;
      result |= (b & 0x1f) << shift;
      shift += 5;
    } while (b >= 0x20);
    const dlng = result & 1 ? ~(result >> 1) : result >> 1;
    lng += dlng;

    puntos.push({ lat: lat / 1e5, lng: lng / 1e5 });
  }
  return puntos;
}

/** Genera rutas simuladas cuando OSRM no está disponible (modo demo/offline) */
function simularRutas(origen, destino) {
  const distanciaBase = distanciaHaversineKm(origen, destino);
  const rutas = [
    { nombre: 'Ruta principal (vía nacional)', factorDist: 1.15, factorVel: 65 },
    { nombre: 'Ruta corta (vía veredal)', factorDist: 0.95, factorVel: 28 },
    { nombre: 'Ruta alterna (mayor rodeo)', factorDist: 1.35, factorVel: 50 },
  ];

  return rutas.map((r, index) => {
    const distanciaKm = Number((distanciaBase * r.factorDist).toFixed(2));
    const duracionMin = Number(((distanciaKm / r.factorVel) * 60).toFixed(1));
    const puntosMuestra = extraerPuntosMuestra([
      origen,
      { lat: (origen.lat + destino.lat) / 2, lng: (origen.lng + destino.lng) / 2 },
      destino,
    ]);
    return {
      id: `ruta_${index + 1}`,
      resumen: r.nombre,
      distanciaKm,
      duracionMin,
      polyline: null,
      puntosMuestra,
      viasPrincipales: [],
    };
  });
}

function distanciaHaversineKm(a, b) {
  const R = 6371;
  const dLat = ((b.lat - a.lat) * Math.PI) / 180;
  const dLng = ((b.lng - a.lng) * Math.PI) / 180;
  const lat1 = (a.lat * Math.PI) / 180;
  const lat2 = (b.lat * Math.PI) / 180;
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(h), Math.sqrt(1 - h));
}

module.exports = {
  obtenerRutasAlternativas,
  distanciaHaversineKm,
  decodificarPolyline,
  extraerPuntosMuestra,
};
