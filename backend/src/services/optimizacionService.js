const { obtenerRutasAlternativas } = require('./osrmService');
const { obtenerAltitudes } = require('./elevationService');
const { obtenerClimaPromedioRuta } = require('./weatherService');
const { evaluarEstadoCarretera } = require('./roadConditionService');
const { calcularEmisionesCO2 } = require('../utils/co2Calculator');
const { calcularRiesgoDeterioro } = require('../utils/deteriorationRisk');
const { calcularRiesgoDeterioroBanano } = require('../utils/bananaDeteriorationRisk');
const { ordenarConMetricas, registrarMetricas } = require('../utils/ordenamiento');

/**
 * Criterios para ordenar las rutas evaluadas: menor puntaje ecológico y, si hay
 * empate, menor riesgo de deterioro y luego menor distancia.
 */
const CRITERIOS_RECOMENDACION = 'puntajeEcologico:asc,riesgoDeterioro:asc,distanciaKm:asc';

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
 * Evalúa todas las rutas alternativas entre origen y destino, calcula sus
 * indicadores (clima, altitud, CO2, riesgo de deterioro, estado de la vía)
 * y determina cuál es la más ecológica.
 */
async function evaluarRutas(origen, destino, producto = 'cafe') {
  const rutas = await obtenerRutasAlternativas(origen, destino);

  const rutasEvaluadas = await Promise.all(
    rutas.map((ruta) => evaluarRutaIndividual(ruta, producto))
);

  // Normalización min-max de cada indicador para poder combinarlos en un solo puntaje
  const normalizados = normalizarIndicadores(rutasEvaluadas);

  const rutasConPuntaje = rutasEvaluadas.map((ruta, i) => {
    const n = normalizados[i];
    const puntajeEcologico =
      n.distancia * PESOS.distancia +
      n.tiempo * PESOS.tiempo +
      n.emisionesCO2 * PESOS.emisionesCO2 +
      n.riesgoDeterioro * PESOS.riesgoDeterioro +
      n.estadoCarretera * PESOS.estadoCarretera +
      n.variacionAltitud * PESOS.variacionAltitud;

    return { ...ruta, puntajeEcologico: Number((puntajeEcologico * 100).toFixed(2)) };
  });

  // Ordenar con MergeSort multicriterio (implementación propia, ver utils/ordenamiento.js).
  // Menor puntaje = más ecológico/recomendable.
  const { datos: rutasOrdenadas, metricas } = ordenarConMetricas('merge', rutasConPuntaje, CRITERIOS_RECOMENDACION);
  registrarMetricas('evaluacion de rutas', metricas);

  return {
    rutasEvaluadas: rutasOrdenadas,
    rutaRecomendada: rutasOrdenadas[0],
  };
}

/** Evalúa una sola ruta: clima, altitud, estado de vía, CO2 y riesgo de deterioro */
async function evaluarRutaIndividual(ruta, producto) {
  const [clima, altitudes] = await Promise.all([
    obtenerClimaPromedioRuta(ruta.puntosMuestra),
    obtenerAltitudes(ruta.puntosMuestra),
  ]);

  const altitudPromedio = promedio(altitudes);
  const variacionAltitud = Math.max(...altitudes) - Math.min(...altitudes);

  const { estado: estadoCarretera, factorRiesgo: factorRiesgoCarretera } =
    evaluarEstadoCarretera(ruta);

  const emisionesCO2Kg = calcularEmisionesCO2({
    distanciaKm: ruta.distanciaKm,
    factorRiesgoCarretera,
  });

  let riesgoDeterioro;

  if (producto === 'banano') {
    riesgoDeterioro = calcularRiesgoDeterioroBanano({
      duracionMin: ruta.duracionMin,
      temperatura: clima.temperatura,
      humedad: clima.humedad,
      factorRiesgoCarretera,
    });
} else {
  riesgoDeterioro = calcularRiesgoDeterioro({
    duracionMin: ruta.duracionMin,
    temperatura: clima.temperatura,
    humedad: clima.humedad,
    lluviaMm: clima.lluviaMm,
    factorRiesgoCarretera,
    variacionAltitud,
  });
}

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
