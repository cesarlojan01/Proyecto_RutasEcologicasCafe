const express = require('express');
const router = express.Router();
const { evaluarRutas } = require('../services/optimizacionService');
const { cargarPerfil } = require('../services/productoService');
const RutaHistorial = require('../models/RutaHistorial');
const Finca = require('../models/Finca');
const Planta = require('../models/Planta');

/**
 * Guarda el histórico de una evaluación. Nunca rompe la respuesta: la API debe funcionar
 * sin persistencia (modo demo).
 *
 * Se comprueba el estado de la conexión ANTES de llamar a create(): sin conexión, Mongoose
 * encola la operación y la rechaza recién a los 10 s (bufferTimeoutMS), con lo que cada
 * petición tardaba 10 s de más cuando no había BD.
 */
async function guardarHistorial({ finca, planta, origen, destino, resultado }) {
  if (RutaHistorial.db.readyState !== 1) {
    console.warn('Histórico no guardado: BD no conectada.');
    return;
  }
  try {
    await RutaHistorial.create({
      finca: finca || undefined,
      planta: planta || undefined,
      origen,
      destino,
      // Snapshot del producto: los perfiles se ajustan con el tiempo; sin esto el histórico
      // deja de ser interpretable.
      producto: {
        slug: resultado.producto.slug,
        nombre: resultado.producto.nombre,
        version: resultado.producto.version,
      },
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
 * POST /api/rutas/evaluar
 * Body esperado:
 * {
 *   "origen": { "lat": 4.815, "lng": -75.694 },
 *   "destino": { "lat": 4.902, "lng": -75.812 },
 *   "productoSlug": "cafe",      // opcional; si se omite, "cafe" (contrato de la Unidad 1)
 *   "fincaId": "opcional",
 *   "plantaId": "opcional"
 * }
 */
router.post('/evaluar', async (req, res, next) => {
  try {
    const { origen, destino, fincaId, plantaId, productoSlug } = req.body;

    if (!origen?.lat || !origen?.lng || !destino?.lat || !destino?.lng) {
      return res.status(400).json({
        error: true,
        mensaje: 'Se requieren origen y destino con lat y lng',
      });
    }

    // Lanza Error con status 400 si el slug no existe (lo traduce el manejador global).
    const perfil = cargarPerfil(productoSlug);

    const resultado = await evaluarRutas(origen, destino, perfil);

    await guardarHistorial({ finca: fincaId, planta: plantaId, origen, destino, resultado });

    res.json(resultado);
  } catch (error) {
    next(error);
  }
});

/**
 * POST /api/rutas/evaluar-por-ids
 * Evalúa la ruta usando IDs de finca y planta ya registrados.
 * Body: { "fincaId": "...", "plantaId": "...", "productoSlug": "cafe" (opcional) }
 */
router.post('/evaluar-por-ids', async (req, res, next) => {
  try {
    const { fincaId, plantaId, productoSlug } = req.body;
    if (!fincaId || !plantaId) {
      return res.status(400).json({ error: true, mensaje: 'fincaId y plantaId son obligatorios' });
    }

    // Antes de consultar la BD: un slug inválido no debe costar dos consultas.
    const perfil = cargarPerfil(productoSlug);

    const [finca, planta] = await Promise.all([
      Finca.findById(fincaId),
      Planta.findById(plantaId),
    ]);

    if (!finca) return res.status(404).json({ error: true, mensaje: 'Finca no encontrada' });
    if (!planta) return res.status(404).json({ error: true, mensaje: 'Planta no encontrada' });

    const resultado = await evaluarRutas(finca.ubicacion, planta.ubicacion, perfil);

    await guardarHistorial({
      finca: finca._id,
      planta: planta._id,
      origen: finca.ubicacion,
      destino: planta.ubicacion,
      resultado,
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