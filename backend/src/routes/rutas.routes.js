const express = require('express');
const router = express.Router();
const { evaluarRutas } = require('../services/optimizacionService');
const RutaHistorial = require('../models/RutaHistorial');
const Finca = require('../models/Finca');
const Planta = require('../models/Planta');

/**
 * POST /api/rutas/evaluar
 * Body esperado:
 * {
 *   "origen": { "lat": 4.815, "lng": -75.694 },
 *   "destino": { "lat": 4.902, "lng": -75.812 },
 *   "fincaId": "opcional",
 *   "plantaId": "opcional"
 * }
 */
router.post('/evaluar', async (req, res, next) => {
  try {
    const { origen, destino, fincaId, plantaId, producto = 'cafe' } = req.body;

    if (!origen?.lat || !origen?.lng || !destino?.lat || !destino?.lng) {
      return res.status(400).json({
        error: true,
        mensaje: 'Se requieren origen y destino con lat y lng',
      });
    }

    const resultado = await evaluarRutas(origen, destino, producto);

    // Guardar histórico si la base de datos está disponible
    try {
      await RutaHistorial.create({
        finca: fincaId || undefined,
        planta: plantaId || undefined,
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

    res.json(resultado);
  } catch (error) {
    next(error);
  }
});

/**
 * POST /api/rutas/evaluar-por-ids
 * Evalúa la ruta usando IDs de finca y planta ya registrados.
 * Body: { "fincaId": "...", "plantaId": "..." }
 */
router.post('/evaluar-por-ids', async (req, res, next) => {
  try {
    const { fincaId, plantaId, producto = 'cafe' } = req.body;
    if (!fincaId || !plantaId) {
      return res.status(400).json({ error: true, mensaje: 'fincaId y plantaId son obligatorios' });
    }

    const [finca, planta] = await Promise.all([
      Finca.findById(fincaId),
      Planta.findById(plantaId),
    ]);

    if (!finca) return res.status(404).json({ error: true, mensaje: 'Finca no encontrada' });
    if (!planta) return res.status(404).json({ error: true, mensaje: 'Planta no encontrada' });

    const resultado = await evaluarRutas(
      finca.ubicacion,
      planta.ubicacion,
      producto
);

    await RutaHistorial.create({
      finca: finca._id,
      planta: planta._id,
      producto,
      origen: finca.ubicacion,
      destino: planta.ubicacion,
      rutasEvaluadas: resultado.rutasEvaluadas,
      rutaSeleccionada: {
        resumen: resultado.rutaRecomendada.resumen,
        puntajeEcologico: resultado.rutaRecomendada.puntajeEcologico,
      },
    });

    res.json(resultado);
  } catch (error) {
    next(error);
  }
});

// Histórico de rutas evaluadas
router.get('/historial', async (req, res, next) => {
  try {
    const historial = await RutaHistorial.find()
      .populate('finca', 'nombre')
      .populate('planta', 'nombre')
      .sort({ createdAt: -1 })
      .limit(50);
    res.json(historial);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
