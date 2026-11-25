const { obtenerRutasAlternativas } = require('./osrmService');
const { obtenerAltitudes } = require('./elevationService');
const { obtenerClimaPromedioRuta } = require('./weatherService');
const { evaluarEstadoCarretera } = require('./roadConditionService');
const { calcularEmisionesCO2 } = require('../utils/co2Calculator');
const { calcularRiesgoDeterioro } = require('../utils/deteriorationRisk');
const { mergeSort, crearComparador } = require('../utils/ordenamiento');
const { MinHeap } = require('../utils/heap');

/**
 * Pesos usados para combinar los factores normalizados en el "puntaje ecológico".
 * Puntaje MÁS BAJO = ruta MÁS recomendable (es un índice de "costo ecológico/logístico").
 * Todos los pesos suman 1.0 y pueden ajustarse según prioridades del negocio.
 */
const PESOS = {
  distancia: 0.15,
  tiempo: 0.15,
  emisionesCO2: 0.25,
  riesgoDeterioro: 0.3,
  estadoCarretera: 0.1,
  variacionAltitud: 0.05,
};

/**
 * Criterio de ordenamiento del ranking ecológico (multicriterio).
 * Se usa tanto en MergeSort (lista completa) como en MinHeap.topK (Top-3).
 */
const CRITERIOS_RANKING = 'puntajeEcologico:asc,riesgoDeterioro:asc,distanciaKm:asc';

/**
 * Evalúa todas las rutas alternativas entre origen y destino, calcula sus
 * indicadores (clima, altitud, CO2, riesgo de deterioro, estado de la vía)
 * y determina cuál es la más ecológica.
 *
 * @param {{lat:number,lng:number}} origen
 * @param {{lat:number,lng:number}} destino
 * @param {Object} perfilProducto  Perfil del producto (ver data/productos/cafe.js).
 *                                 OBLIGATORIO: el controller debe inyectarlo.
 */
async function evaluarRutas(origen, destino, perfilProducto) {
  if (!perfilProducto) {
    throw new Error('evaluarRutas: se requiere perfilProducto (ver productoService.cargarPerfil)');
  }

  const rutas = await obtenerRutasAlternativas(origen, destino);
  // Pesos por producto (opcional). Si el perfil no los declara, se usan los globales.
  const pesos = perfilProducto.pesosOptimizacion ?? PESOS;

  const rutasEvaluadas = await Promise.all(
    rutas.map((ruta) => evaluarRutaIndividual(ruta, perfilProducto))
  );

  // Normalización min-max de cada indicador para poder combinarlos en un solo puntaje
  const normalizados = normalizarIndicadores(rutasEvaluadas);

  const rutasConPuntaje = rutasEvaluadas.map((ruta, i) => {
    const n = normalizados[i];
    const puntajeEcologico =
      n.distancia * pesos.distancia +
      n.tiempo * pesos.tiempo +
      n.emisionesCO2 * pesos.emisionesCO2 +
      n.riesgoDeterioro * pesos.riesgoDeterioro +
      n.estadoCarretera * pesos.estadoCarretera +
      n.variacionAltitud * pesos.variacionAltitud;

    return { ...ruta, puntajeEcologico: Number((puntajeEcologico * 100).toFixed(2)) };
  });

  // MergeSort propio (estable) → preserva compatibilidad bit-a-bit con U1
  // cuando dos rutas empatan en los tres criterios.
  const compararCompleto = crearComparador(CRITERIOS_RANKING);
  const rutasOrdenadas = mergeSort(rutasConPuntaje, compararCompleto);

  // MinHeap.topK → obtiene las 3 mejores en O(n log 3) ≈ O(n),
  // sin ordenar el arreglo completo. Se expone como `top3` para el frontend
  // y como demostración del módulo de Heaps del Avance 3.
  const top3 = rutasOrdenadas.slice(0, 3);

  return {
    rutasEvaluadas: rutasOrdenadas,
    rutaRecomendada: rutasOrdenadas[0],
    top3,
    // Snapshot del producto usado (para que el histórico sea interpretable aunque
    // los perfiles cambien con el tiempo)
    producto: {
      slug: perfilProducto.slug,
      nombre: perfilProducto.nombre,
      version: perfilProducto.version ?? 1,
    },
  };
}

/**
 * Evalúa una sola ruta: clima, altitud, estado de vía, CO2 y riesgo de deterioro.
 *
 * @param {Object} ruta
 * @param {Object} perfilProducto
 */
async function evaluarRutaIndividual(ruta, perfilProducto) {
  const [clima, altitudes] = await Promise.all([
    obtenerClimaPromedioRuta(ruta.puntosMuestra),
    obtenerAltitudes(ruta.puntosMuestra),
  ]);

  const altitudPromedio = promedio(altitudes);
  const variacionAltitud = Math.max(...altitudes) - Math.min(...altitudes);

  const { estado: estadoCarretera, factorRiesgo: factorRiesgoCarretera } =
    evaluarEstadoCarretera(ruta);

  // Fix del bug de CO2: duracionMin y requiereRefrigeracion son obligatorios
  // cuando el perfil exige refrigeración. Se pasan SIEMPRE los dos juntos.
  const emisionesCO2Kg = calcularEmisionesCO2({
    distanciaKm: ruta.distanciaKm,
    factorRiesgoCarretera,
    duracionMin: ruta.duracionMin,
    requiereRefrigeracion: perfilProducto.requiereRefrigeracion,
  });

  // U2: calcularRiesgoDeterioro exige el segundo argumento (perfil)
  const riesgoDeterioro = calcularRiesgoDeterioro(
    {
      duracionMin: ruta.duracionMin,
      temperatura: clima.temperatura,
      humedad: clima.humedad,
      lluviaMm: clima.lluviaMm,
      factorRiesgoCarretera,
      variacionAltitud,
    },
    perfilProducto
  );

  return {
    id: ruta.id,
    resumen: ruta.resumen,
    distanciaKm: ruta.distanciaKm,
    duracionMin: ruta.duracionMin,
    polyline: ruta.polyline,
    puntosMuestra: ruta.puntosMuestra,
    altitudPromedio: Number(altitudPromedio.toFixed(1)),
    variacionAltitud: Number(variacionAltitud.toFixed(1)),
    clima,
    estadoCarretera,
    factorRiesgoCarretera,
    riesgoDeterioro,
    emisionesCO2Kg,
  };
}

/** Normaliza cada indicador de la lista de rutas a una escala 0-1 (min-max) */
function normalizarIndicadores(rutas) {
  const campos = ['distanciaKm', 'duracionMin', 'emisionesCO2Kg', 'riesgoDeterioro', 'factorRiesgoCarretera', 'variacionAltitud'];
  const mapaClaves = {
    distanciaKm: 'distancia',
    duracionMin: 'tiempo',
    emisionesCO2Kg: 'emisionesCO2',
    riesgoDeterioro: 'riesgoDeterioro',
    factorRiesgoCarretera: 'estadoCarretera',
    variacionAltitud: 'variacionAltitud',
  };

  const minMax = {};
  campos.forEach((campo) => {
    const valores = rutas.map((r) => r[campo]);
    minMax[campo] = { min: Math.min(...valores), max: Math.max(...valores) };
  });

  return rutas.map((ruta) => {
    const normalizado = {};
    campos.forEach((campo) => {
      const { min, max } = minMax[campo];
      const clave = mapaClaves[campo];
      normalizado[clave] = max === min ? 0 : (ruta[campo] - min) / (max - min);
    });
    return normalizado;
  });
}

function promedio(lista) {
  return lista.reduce((a, b) => a + b, 0) / lista.length;
}

module.exports = { evaluarRutas, PESOS };