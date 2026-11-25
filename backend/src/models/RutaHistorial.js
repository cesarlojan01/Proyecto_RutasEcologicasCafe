const mongoose = require('mongoose');

const RutaHistorialSchema = new mongoose.Schema(
  {
    finca: { type: mongoose.Schema.Types.ObjectId, ref: 'Finca' },
    planta: { type: mongoose.Schema.Types.ObjectId, ref: 'Planta' },
    producto: {
      slug: { type: String, index: true },
      nombre: { type: String },
      version: { type: Number },
    },
    origen: {
      lat: Number,
      lng: Number,
    },
    destino: {
      lat: Number,
      lng: Number,
    },
    rutasEvaluadas: [
      {
        resumen: String,
        distanciaKm: Number,
        duracionMin: Number,
        altitudPromedio: Number,
        clima: {
          descripcion: String,
          temperatura: Number,
          humedad: Number,
          lluviaMm: Number,
        },
        estadoCarretera: String,
        riesgoDeterioro: Number,
        emisionesCO2Kg: Number,
        puntajeEcologico: Number,
      },
    ],
    rutaSeleccionada: {
      resumen: String,
      puntajeEcologico: Number,
    },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

module.exports = mongoose.model('RutaHistorial', RutaHistorialSchema);
