const express = require('express');
const router = express.Router();
const { evaluarRutasConDijkstra, CRITERIOS } = require('../services/dijkstraService');
const RutaHistorial = require('../models/RutaHistorial');
const Finca = require('../models/Finca');
const Planta = require('../models/Planta');

/**
 * Rutas con Dijkstra. Reciben el mismo cuerpo y devuelven el mismo formato que
 * /api/rutas/evaluar y /api/rutas/evaluar-por-ids, así el frontend solo cambia la URL.
 *
 * Campos opcionales extra en el cuerpo:
 *   criterio: 'ecologico' (por defecto) | 'distancia' | 'tiempo' | 'co2'
 *   cola:     'heap' (por defecto) | 'arreglo'   (solo para comparar tiempos)
 *
 * La respuesta agrega el campo "dijkstra" con las métricas del algoritmo.
 */

function validarOpciones(body) {
  const { criterio, cola } = body;
  if (criterio && !CRITERIOS.includes(criterio)) {
    return `criterio no válido. Use: ${CRITERIOS.join(', ')}`;
  }
  if (cola && cola !== 'heap' && cola !== 'arreglo') {
    return 'cola no válida. Use: heap o arreglo';
  }
  return null;
}

/** Guarda la evaluación en el historial, igual que /api/rutas. Si la BD falla, solo avisa. */
async function guardarHistorial({ finca, planta, producto, origen, destino, resultado }) {
  try {
    await RutaHistorial.create({
      finca: finca || undefined,
      planta: planta || undefined,
      producto,
      origen,
      destino,
      rutasEvaluadas: resultado.rutasEvaluadas.map((r) => ({
        resumen: r.resumen,
        distanciaKm: r.distanciaKm,
        duracionMin: r.duracionMin,
        altitudPromedio: r.altitudPromedio,
        clima: r.clima,
        estadoCarretera: r.estadoCarretera,
        riesgoDeterioro: r.riesgoDeterioro,
        emisionesCO2Kg: r.emisionesCO2Kg,
        puntajeEcologico: r.puntajeEcologico,
      })),
      rutaSeleccionada: {
        resumen: resultado.rutaRecomendada.resumen,
        puntajeEcologico: resultado.rutaRecomendada.puntajeEcologico,
      },
    });
  } catch (dbError) {
    console.warn('No se pudo guardar el histórico de la ruta (BD no disponible):', dbError.message);
  }
}

/**
 * POST /api/dijkstra/evaluar
 * Body: { origen: {lat,lng}, destino: {lat,lng}, fincaId?, plantaId?, producto?, criterio?, cola? }
 */
router.post('/evaluar', async (req, res, next) => {
  try {
    const { origen, destino, fincaId, plantaId, producto = 'cafe', criterio, cola } = req.body;

    if (!origen?.lat || !origen?.lng || !destino?.lat || !destino?.lng) {
      return res.status(400).json({ error: true, mensaje: 'Se requieren origen y destino con lat y lng' });
    }
    const errorOpciones = validarOpciones(req.body);
    if (errorOpciones) return res.status(400).json({ error: true, mensaje: errorOpciones });

    const resultado = await evaluarRutasConDijkstra(origen, destino, producto, { criterio, cola });
    await guardarHistorial({ finca: fincaId, planta: plantaId, producto, origen, destino, resultado });
    res.json(resultado);
  } catch (error) {
    next(error);
  }
});

/**
 * POST /api/dijkstra/evaluar-por-ids
 * Body: { fincaId, plantaId, producto?, criterio?, cola? }
 */
router.post('/evaluar-por-ids', async (req, res, next) => {
  try {
    const { fincaId, plantaId, producto = 'cafe', criterio, cola } = req.body;
    if (!fincaId || !plantaId) {
      return res.status(400).json({ error: true, mensaje: 'fincaId y plantaId son obligatorios' });
    }
    const errorOpciones = validarOpciones(req.body);
    if (errorOpciones) return res.status(400).json({ error: true, mensaje: errorOpciones });

    const [finca, planta] = await Promise.all([Finca.findById(fincaId), Planta.findById(plantaId)]);
    if (!finca) return res.status(404).json({ error: true, mensaje: 'Finca no encontrada' });
    if (!planta) return res.status(404).json({ error: true, mensaje: 'Planta no encontrada' });

    const resultado = await evaluarRutasConDijkstra(finca.ubicacion, planta.ubicacion, producto, { criterio, cola });
    await guardarHistorial({
      finca: finca._id,
      planta: planta._id,
      producto,
      origen: finca.ubicacion,
      destino: planta.ubicacion,
      resultado,
    });
    res.json(resultado);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
