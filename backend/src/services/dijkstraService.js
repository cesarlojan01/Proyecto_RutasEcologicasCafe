/**
 * Ruta más ecológica con Dijkstra sobre la red vial que devuelve OSRM.
 *
 * Flujo:
 *  1. Se piden a OSRM las rutas alternativas CON el detalle de cada segmento
 *     (nodos de OpenStreetMap, distancia y duración). Es la misma llamada de siempre.
 *  2. Con esos segmentos se arma un grafo propio: cada nodo de OSM es un nodo del grafo
 *     y cada par de nodos consecutivos es una arista. Si dos rutas pasan por el mismo
 *     cruce, comparten el nodo, y Dijkstra puede cambiarse de una ruta a otra ahí.
 *  3. A cada arista se le asigna un costo ecológico (CO2, riesgo, estado de la vía,
 *     distancia y tiempo) con las fórmulas del proyecto.
 *  4. Dijkstra (utils/dijkstra.js) busca el camino de menor costo entre la finca y la planta.
 *  5. El camino se convierte en una ruta con el mismo formato que las de OSRM y se evalúa
 *     junto con ellas (clima, altitud, puntaje ecológico y orden con MergeSort).
 *
 * OSRM solo aporta los DATOS de los tramos; la elección del camino la hace Dijkstra.
 */
const { obtenerRutasAlternativas, distanciaHaversineKm, extraerPuntosMuestra } = require('./osrmService');
const { evaluarListaDeRutas, PESOS } = require('./optimizacionService');
const { evaluarEstadoCarretera } = require('./roadConditionService');
const { calcularEmisionesCO2 } = require('../utils/co2Calculator');
const { Grafo } = require('../utils/grafo');
const { dijkstra, registrarMetricasDijkstra } = require('../utils/dijkstra');

const NODO_ORIGEN = 'ORIGEN';
const NODO_DESTINO = 'DESTINO';

/**
 * Criterios de peso disponibles. "ecologico" combina todos los factores con los
 * mismos pesos del puntaje ecológico (sin la variación de altitud, que no se conoce
 * por segmento); los demás optimizan un solo factor.
 */
const CRITERIOS = ['ecologico', 'distancia', 'tiempo', 'co2'];

/**
 * Calcula los indicadores de un segmento a partir de su distancia y duración.
 * Todos los valores son >= 0 y se pueden sumar a lo largo de un camino.
 */
function indicadoresSegmento(distanciaKm, duracionMin) {
  const { factorRiesgo } =
    duracionMin > 0
      ? evaluarEstadoCarretera({ distanciaKm, duracionMin })
      : { factorRiesgo: 0.5 }; // sin duración no se puede estimar la velocidad
  return {
    distanciaKm,
    duracionMin,
    factorRiesgoCarretera: factorRiesgo,
    emisionesCO2Kg: calcularEmisionesCO2({ distanciaKm, factorRiesgoCarretera: factorRiesgo }),
    // El deterioro de la pulpa crece con el tiempo de viaje y empeora en vías malas.
    riesgo: duracionMin * (1 + factorRiesgo),
    // Kilómetros recorridos "ponderados" por lo mala que es la vía.
    carretera: distanciaKm * factorRiesgo,
  };
}

/**
 * Convierte los indicadores de un segmento en un solo costo (peso de la arista).
 * Cada indicador se divide entre un valor de referencia (el promedio de las rutas
 * de OSRM) para que queden en la misma escala antes de aplicarles los pesos.
 */
function costoSegmento(ind, referencias, criterio) {
  switch (criterio) {
    case 'distancia':
      return ind.distanciaKm;
    case 'tiempo':
      return ind.duracionMin;
    case 'co2':
      return ind.emisionesCO2Kg;
    default:
      return (
        PESOS.distancia * (ind.distanciaKm / referencias.distanciaKm) +
        PESOS.tiempo * (ind.duracionMin / referencias.duracionMin) +
        PESOS.emisionesCO2 * (ind.emisionesCO2Kg / referencias.emisionesCO2Kg) +
        PESOS.riesgoDeterioro * (ind.riesgo / referencias.riesgo) +
        PESOS.estadoCarretera * (ind.carretera / referencias.carretera)
      );
  }
}

/**
 * Pasa la respuesta de OSRM a una lista de segmentos por ruta:
 * [{ desde, hasta, coordDesde, coordHasta, distanciaKm, duracionMin }].
 *
 * Si OSRM entregó los ids de nodos y coinciden con las coordenadas, se usan como
 * claves (son únicos en OpenStreetMap). Si no, se usa la coordenada redondeada y
 * la distancia se calcula con Haversine.
 */
function segmentosDeRuta(ruta) {
  const { coordenadas = [], nodos = [], distancias = [], duraciones = [] } = ruta.tramos || {};
  const alineado =
    nodos.length === coordenadas.length &&
    distancias.length === coordenadas.length - 1 &&
    duraciones.length === coordenadas.length - 1;

  const velocidadMedia = ruta.duracionMin > 0 ? ruta.distanciaKm / ruta.duracionMin : 0; // km/min
  const clave = (i) =>
    alineado ? `osm:${nodos[i]}` : `geo:${coordenadas[i].lat.toFixed(5)},${coordenadas[i].lng.toFixed(5)}`;

  const segmentos = [];
  for (let i = 0; i + 1 < coordenadas.length; i++) {
    const desde = clave(i);
    const hasta = clave(i + 1);
    if (desde === hasta) continue; // puntos repetidos
    const distanciaKm = alineado
      ? distancias[i] / 1000
      : distanciaHaversineKm(coordenadas[i], coordenadas[i + 1]);
    const duracionMin = alineado
      ? duraciones[i] / 60
      : velocidadMedia > 0 ? distanciaKm / velocidadMedia : 0;
    segmentos.push({
      desde,
      hasta,
      coordDesde: coordenadas[i],
      coordHasta: coordenadas[i + 1],
      distanciaKm,
      duracionMin,
    });
  }
  return segmentos;
}

/** Promedio de los totales de las rutas de OSRM: valores de referencia para normalizar. */
function calcularReferencias(segmentosPorRuta) {
  const suma = { distanciaKm: 0, duracionMin: 0, emisionesCO2Kg: 0, riesgo: 0, carretera: 0 };
  for (const segmentos of segmentosPorRuta) {
    for (const s of segmentos) {
      const ind = indicadoresSegmento(s.distanciaKm, s.duracionMin);
      suma.distanciaKm += ind.distanciaKm;
      suma.duracionMin += ind.duracionMin;
      suma.emisionesCO2Kg += ind.emisionesCO2Kg;
      suma.riesgo += ind.riesgo;
      suma.carretera += ind.carretera;
    }
  }
  let n = 0;
  for (const segmentos of segmentosPorRuta) if (segmentos.length > 0) n++;
  if (n === 0) n = 1;
  const referencias = {};
  for (const k of Object.keys(suma)) {
    referencias[k] = suma[k] / n > 0 ? suma[k] / n : 1; // evita dividir entre 0
  }
  return referencias;
}

/**
 * Construye el grafo de la red vial a partir de las rutas de OSRM.
 * Las aristas se agregan en ambos sentidos (las vías son de doble sentido) y se
 * conectan dos nodos virtuales, ORIGEN y DESTINO, al inicio y al final de cada ruta.
 */
function construirGrafo(rutasOsrm, criterio = 'ecologico') {
  // Se mantiene un elemento por ruta (aunque esté vacío) para no perder el índice.
  const segmentosPorRuta = rutasOsrm.map(segmentosDeRuta);
  const referencias = calcularReferencias(segmentosPorRuta);
  const grafo = new Grafo();

  for (const segmentos of segmentosPorRuta) {
    if (segmentos.length === 0) continue;
    for (const s of segmentos) {
      grafo.agregarNodo(s.desde, s.coordDesde);
      grafo.agregarNodo(s.hasta, s.coordHasta);
      const ind = indicadoresSegmento(s.distanciaKm, s.duracionMin);
      const peso = costoSegmento(ind, referencias, criterio);
      grafo.agregarAristaDoble(s.desde, s.hasta, peso, {
        distanciaKm: ind.distanciaKm,
        duracionMin: ind.duracionMin,
      });
    }
    const primero = segmentos[0];
    const ultimo = segmentos[segmentos.length - 1];
    grafo.agregarNodo(NODO_ORIGEN, primero.coordDesde);
    grafo.agregarNodo(NODO_DESTINO, ultimo.coordHasta);
    grafo.agregarArista(NODO_ORIGEN, primero.desde, 0, { distanciaKm: 0, duracionMin: 0 });
    grafo.agregarArista(ultimo.hasta, NODO_DESTINO, 0, { distanciaKm: 0, duracionMin: 0 });
  }

  return { grafo, referencias, segmentosPorRuta };
}

/** Codifica una lista de puntos en polyline (precisión 5), el formato que dibuja el frontend. */
function codificarPolyline(puntos) {
  let resultado = '';
  let latAnterior = 0;
  let lngAnterior = 0;
  for (const p of puntos) {
    const lat = Math.round(p.lat * 1e5);
    const lng = Math.round(p.lng * 1e5);
    resultado += codificarNumero(lat - latAnterior) + codificarNumero(lng - lngAnterior);
    latAnterior = lat;
    lngAnterior = lng;
  }
  return resultado;
}

function codificarNumero(valor) {
  let v = valor < 0 ? ~(valor << 1) : valor << 1;
  let salida = '';
  while (v >= 0x20) {
    salida += String.fromCharCode((0x20 | (v & 0x1f)) + 63);
    v >>= 5;
  }
  return salida + String.fromCharCode(v + 63);
}

/**
 * Ejecuta todo el proceso y devuelve la ruta de Dijkstra junto con las de OSRM,
 * listas para evaluar.
 */
async function calcularRutaDijkstra(origen, destino, opciones = {}) {
  const criterio = CRITERIOS.includes(opciones.criterio) ? opciones.criterio : 'ecologico';
  const cola = opciones.cola === 'arreglo' ? 'arreglo' : 'heap';
  const rutasOsrm = await obtenerRutasAlternativas(origen, destino, { conTramos: true });

  const conTramos = rutasOsrm.filter((r) => r.tramos && r.tramos.coordenadas.length > 1);
  if (conTramos.length === 0) {
    // OSRM no respondió (rutas simuladas): no hay red vial para armar el grafo.
    return { rutas: rutasOsrm, dijkstra: { disponible: false, motivo: 'OSRM no devolvió el detalle de los tramos' } };
  }

  const { grafo, segmentosPorRuta } = construirGrafo(conTramos, criterio);
  const resultado = dijkstra(grafo, NODO_ORIGEN, NODO_DESTINO, { cola });
  registrarMetricasDijkstra(`ruta mas ecologica (${criterio})`, resultado);

  const rutasSinTramos = rutasOsrm.map(({ tramos, ...resto }) => resto);
  if (!resultado.encontrado) {
    return { rutas: rutasSinTramos, dijkstra: { disponible: false, motivo: 'No hay camino en el grafo', metricas: resultado.metricas } };
  }

  // Camino sin los nodos virtuales y suma de distancia y duración reales.
  const caminoReal = resultado.camino.filter((id) => id !== NODO_ORIGEN && id !== NODO_DESTINO);
  const puntos = caminoReal.map((id) => grafo.obtenerNodo(id));
  let distanciaKm = 0;
  let duracionMin = 0;
  for (const arista of resultado.aristas) {
    distanciaKm += arista.distanciaKm;
    duracionMin += arista.duracionMin;
  }

  const resumenDijkstra = {
    disponible: true,
    criterio,
    costo: Number(resultado.costo.toFixed(4)),
    nodosDelCamino: caminoReal.length,
    metricas: resultado.metricas,
  };

  // Si el camino coincide con una ruta de OSRM, se marca esa ruta en vez de duplicarla.
  const firmaCamino = caminoReal.join('>');
  const indiceIgual = segmentosPorRuta.findIndex((segs) => {
    if (segs.length === 0) return false;
    const ids = [segs[0].desde];
    for (const s of segs) ids.push(s.hasta);
    return ids.join('>') === firmaCamino;
  });

  if (indiceIgual >= 0) {
    const idIgual = conTramos[indiceIgual].id;
    const rutas = rutasSinTramos.map((r) =>
      r.id === idIgual ? { ...r, esDijkstra: true, resumen: `${r.resumen} · elegida por Dijkstra` } : r
    );
    return { rutas, dijkstra: { ...resumenDijkstra, coincideCon: idIgual } };
  }

  const rutaDijkstra = {
    id: 'ruta_dijkstra',
    resumen: 'Ruta Dijkstra (combinación de tramos de menor costo)',
    distanciaKm,
    duracionMin,
    polyline: codificarPolyline(puntos),
    puntosMuestra: extraerPuntosMuestra(puntos),
    viasPrincipales: [],
    esDijkstra: true,
  };
  return { rutas: [...rutasSinTramos, rutaDijkstra], dijkstra: { ...resumenDijkstra, coincideCon: null } };
}

/**
 * Igual que evaluarRutas() de optimizacionService, pero incluye la ruta de Dijkstra
 * y la devuelve como rutaRecomendada. Devuelve el mismo formato de respuesta, más
 * el campo "dijkstra" con las métricas del algoritmo.
 */
async function evaluarRutasConDijkstra(origen, destino, producto = 'cafe', opciones = {}) {
  const { rutas, dijkstra: infoDijkstra } = await calcularRutaDijkstra(origen, destino, opciones);
  const evaluacion = await evaluarListaDeRutas(rutas, producto);
  const rutaDijkstra = evaluacion.rutasEvaluadas.find((r) => r.esDijkstra);

  return {
    rutasEvaluadas: evaluacion.rutasEvaluadas,
    // Si Dijkstra no pudo ejecutarse, se mantiene la recomendación por puntaje ecológico.
    rutaRecomendada: rutaDijkstra || evaluacion.rutaRecomendada,
    dijkstra: infoDijkstra,
  };
}

module.exports = {
  evaluarRutasConDijkstra,
  calcularRutaDijkstra,
  construirGrafo,
  segmentosDeRuta,
  costoSegmento,
  codificarPolyline,
  CRITERIOS,
};
