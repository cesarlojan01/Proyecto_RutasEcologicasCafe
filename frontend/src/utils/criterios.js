/**
 * Criterios individuales por los que el usuario puede elegir la ruta,
 * además del puntaje ecológico combinado que ya calcula el backend.
 * `campo` es el nombre exacto del indicador dentro de cada ruta evaluada
 * (tal como lo devuelve /api/rutas/evaluar); todos son "menor = mejor".
 */
export const CRITERIOS = [
  { key: 'ecologico', label: '🏆 Puntaje ecológico', campo: 'puntajeEcologico', corto: 'Puntaje ecológico' },
  { key: 'distancia', label: '📏 Menor distancia', campo: 'distanciaKm', corto: 'Menor distancia' },
  { key: 'tiempo', label: '⏱️ Menor tiempo', campo: 'duracionMin', corto: 'Menor tiempo' },
  { key: 'co2', label: '🍃 Menor CO₂', campo: 'emisionesCO2Kg', corto: 'Menor CO₂' },
  { key: 'riesgo', label: '⚠️ Menor riesgo', campo: 'riesgoDeterioro', corto: 'Menor riesgo de deterioro' },
];

/**
 * Devuelve la ruta ganadora (la de menor valor) para un criterio dado,
 * dentro del arreglo de rutas evaluadas de una consulta.
 */
export function obtenerRutaPorCriterio(rutasEvaluadas, criterioKey) {
  const criterio = CRITERIOS.find((c) => c.key === criterioKey) || CRITERIOS[0];
  if (!rutasEvaluadas || rutasEvaluadas.length === 0) return null;

  return rutasEvaluadas.reduce((mejor, actual) =>
    actual[criterio.campo] < mejor[criterio.campo] ? actual : mejor
  );
}

const CRITERIOS_INDIVIDUALES = CRITERIOS.filter(({ key }) => key !== 'ecologico');

/** Guarda la ruta ganadora de cada criterio para una evaluación. */
export function indexarRutasPorCriterio(resultado) {
  const indice = new Map();
  if (!resultado) return indice;

  if (resultado.rutaRecomendada) {
    indice.set('ecologico', resultado.rutaRecomendada);
  }

  for (const ruta of resultado.rutasEvaluadas ?? []) {
    for (const { key, campo } of CRITERIOS_INDIVIDUALES) {
      const ganadora = indice.get(key);
      if (!ganadora || ruta[campo] < ganadora[campo]) {
        indice.set(key, ruta);
      }
    }
  }

  return indice;
}
