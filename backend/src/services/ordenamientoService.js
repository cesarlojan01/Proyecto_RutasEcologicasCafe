/**
 * Ordena los registros guardados en la base de datos (fincas, plantas e historial
 * de rutas evaluadas) con MergeSort o QuickSort y varios criterios a la vez.
 */
const Finca = require('../models/Finca');
const Planta = require('../models/Planta');
const RutaHistorial = require('../models/RutaHistorial');
const {
  ordenarConMetricas, registrarMetricas, crearComparador, parsearCriterios, estaOrdenado,
} = require('../utils/ordenamiento');

/** Campos por los que se puede ordenar cada conjunto de registros */
const CAMPOS = {
  fincas: ['nombre', 'propietario', 'altitud', 'produccionEstimadaKgDia', 'ubicacion.lat', 'ubicacion.lng', 'createdAt'],
  plantas: ['nombre', 'altitud', 'capacidadRecepcionKgDia', 'ubicacion.lat', 'ubicacion.lng', 'createdAt'],
  historial: ['fecha', 'finca', 'planta', 'resumen', 'distanciaKm', 'duracionMin', 'altitudPromedio', 'estadoCarretera',
    'clima.temperatura', 'clima.humedad', 'clima.lluviaMm', 'emisionesCO2Kg', 'riesgoDeterioro', 'puntajeEcologico'],
};

/** Lee de MongoDB los registros del conjunto pedido */
async function cargarRegistros(conjunto) {
  if (conjunto === 'fincas') return Finca.find().lean();
  if (conjunto === 'plantas') return Planta.find().lean();
  if (conjunto === 'historial') {
    // Cada evaluación guarda de 1 a 3 rutas: cada ruta se convierte en un registro
    const evaluaciones = await RutaHistorial.find().populate('finca', 'nombre').populate('planta', 'nombre').lean();
    return evaluaciones.flatMap((evaluacion) =>
      (evaluacion.rutasEvaluadas || []).map((ruta) => ({
        ...ruta,
        fecha: evaluacion.createdAt,
        finca: evaluacion.finca?.nombre ?? 'Coordenadas manuales',
        planta: evaluacion.planta?.nombre ?? 'Coordenadas manuales',
      }))
    );
  }
  throw new Error(`Conjunto no válido: ${conjunto}`);
}

/**
 * Ordena un conjunto de registros de la base de datos.
 * @param {'fincas'|'plantas'|'historial'} conjunto
 * @param {string} criterios  p. ej. "riesgoDeterioro:asc,emisionesCO2Kg:asc"
 * @param {'merge'|'quick'|'comparar'} algoritmo  "comparar" ejecuta los dos
 * @returns {{ total, metricas: Array, datos: Array }}
 */
async function ordenarRegistros(conjunto, criterios, algoritmo = 'comparar') {
  const registros = await cargarRegistros(conjunto);
  const lista = parsearCriterios(criterios);
  const comparar = crearComparador(lista);
  const algoritmos = algoritmo === 'comparar' ? ['merge', 'quick'] : [algoritmo];

  const metricas = [];
  let datos = null;
  for (const alg of algoritmos) {
    const resultado = ordenarConMetricas(alg, registros, lista);
    resultado.metricas.verificado = estaOrdenado(resultado.datos, comparar);
    registrarMetricas(conjunto, resultado.metricas);
    metricas.push(resultado.metricas);
    if (!datos) datos = resultado.datos;
  }
  return { total: registros.length, metricas, datos };
}

module.exports = { CAMPOS, cargarRegistros, ordenarRegistros };
