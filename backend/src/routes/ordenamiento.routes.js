/**
 * API del módulo de ordenamiento (MergeSort / QuickSort sobre los datos de MongoDB).
 *
 *   GET /api/ordenamiento/campos
 *       Campos por los que se puede ordenar cada conjunto.
 *
 *   GET /api/ordenamiento/:conjunto?criterios=...&algoritmo=...&limite=...
 *       :conjunto  fincas | plantas | historial
 *       criterios  "campo:asc,campo2:desc"  (obligatorio; funciona como ORDER BY)
 *       algoritmo  merge | quick | comparar  (por defecto "comparar": ejecuta los dos)
 *       limite     cuántos registros ordenados devolver (por defecto 50)
 *
 *   Ejemplos:
 *   /api/ordenamiento/historial?criterios=riesgoDeterioro:asc,emisionesCO2Kg:asc
 *   /api/ordenamiento/fincas?criterios=produccionEstimadaKgDia:desc,nombre:asc&algoritmo=quick
 *
 *   La respuesta incluye, por algoritmo, el tiempo de ejecución en milisegundos
 *   y el número de comparaciones realizadas.
 */
const express = require('express');
const { CAMPOS, ordenarRegistros } = require('../services/ordenamientoService');
const { parsearCriterios } = require('../utils/ordenamiento');

const router = express.Router();

router.get('/campos', (req, res) => res.json(CAMPOS));

router.get('/:conjunto', async (req, res) => {
  const { conjunto } = req.params;
  const algoritmo = String(req.query.algoritmo || 'comparar').toLowerCase();
  const limite = Math.max(0, Math.min(Number(req.query.limite ?? 50) || 0, 1000));

  if (!Object.hasOwn(CAMPOS, conjunto)) {
    return res.status(400).json({ error: true, mensaje: `Conjunto no válido. Use: ${Object.keys(CAMPOS).join(', ')}` });
  }
  if (!['merge', 'quick', 'comparar'].includes(algoritmo)) {
    return res.status(400).json({ error: true, mensaje: 'algoritmo debe ser merge, quick o comparar' });
  }

  const criterios = parsearCriterios(req.query.criterios);
  const invalidos = criterios.filter((c) => !CAMPOS[conjunto].includes(c.campo));
  if (criterios.length === 0 || invalidos.length > 0) {
    return res.status(400).json({
      error: true,
      mensaje: criterios.length === 0
        ? 'Indique criterios, p. ej. ?criterios=riesgoDeterioro:asc,distanciaKm:desc'
        : `Campos no válidos para "${conjunto}": ${invalidos.map((c) => c.campo).join(', ')}`,
      camposDisponibles: CAMPOS[conjunto],
    });
  }

  try {
    const { total, metricas, datos } = await ordenarRegistros(conjunto, criterios, algoritmo);
    res.json({ conjunto, criterios: metricas[0].criterios, total, metricas, datos: datos.slice(0, limite) });
  } catch (error) {
    res.status(503).json({
      error: true,
      mensaje: 'No se pudo leer la base de datos. Verifique que MongoDB esté disponible.',
      detalle: error.message,
    });
  }
});

module.exports = router;
