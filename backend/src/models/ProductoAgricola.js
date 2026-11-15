const mongoose = require('mongoose');
const { Schema } = mongoose;


const BandaToleranciaSchema = new Schema(
  {
    optimaMin: { type: Number },
    optimaMax: { type: Number, required: true },
    criticaMin: { type: Number },
    criticaMax: { type: Number, required: true },
  },
  { _id: false }
);

//valida que la cota critica sea mayor que la optima
BandaToleranciaSchema.path('criticaMax').validate(
  function (v) {
    return v > this.optimaMax;
  },
  'criticaMax debe ser mayor que optimaMax (si no, el riesgo divide por cero)'
);

BandaToleranciaSchema.path('optimaMin').validate(
  function (v) {
    // optimaMin y criticaMin se declaran juntos, y optimaMin debe ser mayor o igual optimaMax
    return this.criticaMin != null && v <= this.optimaMax;
  },
  'optimaMin exige criticaMin y debe ser <= optimaMax'
);

BandaToleranciaSchema.path('criticaMin').validate(
  function (v) {
    return this.optimaMin != null && v < this.optimaMin;
  },
  'criticaMin exige optimaMin y debe ser menor que optimaMin'
);


const pesoRequerido = { type: Number, required: true, min: 0, max: 1 };

const PesosDeterioroSchema = new Schema(
  {
    tiempo: pesoRequerido,
    temperatura: pesoRequerido,
    humedad: pesoRequerido,
    lluvia: pesoRequerido,
    carretera: pesoRequerido,
    altitud: pesoRequerido,
  },
  { _id: false }
);

PesosDeterioroSchema.path('tiempo').validate(function () {
  const suma = this.tiempo + this.temperatura + this.humedad + this.lluvia + this.carretera + this.altitud;
  return Math.abs(suma - 1) < 1e-6; // evita errores de punto flotante
}, 'Los pesos de deterioro deben sumar 1.0');


const PesosOptimizacionSchema = new Schema(
  {
    distancia: pesoRequerido,
    tiempo: pesoRequerido,
    emisionesCO2: pesoRequerido,
    riesgoDeterioro: pesoRequerido,
    estadoCarretera: pesoRequerido,
    variacionAltitud: pesoRequerido,
  },
  { _id: false }
);

PesosOptimizacionSchema.path('distancia').validate(function () {
  const suma =
    this.distancia + this.tiempo + this.emisionesCO2 + this.riesgoDeterioro + this.estadoCarretera + this.variacionAltitud;
  return Math.abs(suma - 1) < 1e-6;
}, 'Los pesos de optimización deben sumar 1.0');

const ProductoAgricolaSchema = new Schema(
  {

    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^[a-z0-9]+(-[a-z0-9]+)*$/, 'slug solo admite minúsculas, números y guiones'],
    },
    nombre: { type: String, required: true, trim: true },
    icono: { type: String, default: '🌱' },
    descripcion: { type: String, trim: true },
    activo: { type: Boolean, default: true },
    version: { type: Number, default: 1, min: 1 }, // súbela al editar parámetros (trazabilidad)

    vidaUtilHoras: { type: Number, required: true, min: 0.1 },


    densidadKgM3: { type: Number, required: true, min: 1 },

    toleranciaFisica: { type: Number, required: true, min: 0, max: 0.95 },

    // ---- Tolerancias ambientales ----
    sensibilidadTermica: { type: BandaToleranciaSchema, required: true }, // °C
    sensibilidadHumedad: { type: BandaToleranciaSchema, required: true }, // % HR
    lluviaCriticaMmH: { type: Number, required: true, min: 0.1 }, // mm/h con riesgo máximo
    variacionAltitudCriticaM: { type: Number, required: true, min: 1 }, // m de desnivel con riesgo máximo

    // ---- Pesos ----
    pesosDeterioro: { type: PesosDeterioroSchema, required: true },
    pesosOptimizacion: { type: PesosOptimizacionSchema }, // opcional

    // ---- Transporte / CO2 ----
    // Si requiere cadena de frío, el cálculo de CO2 suma el consumo del equipo de refrigeración
    // POR HORA de viaje (término que sí depende de la duración, y por tanto de la ruta).
    // El costo en kg CO2/h del equipo es del vehículo: va en .env, no aquí.
    requiereRefrigeracion: { type: Boolean, default: false },

    // ---- Trazabilidad académica ----
    // Dónde salió cada parámetro. El docente va a preguntar.
    fuentes: [{ type: String, trim: true }],
    notas: { type: String, trim: true },
  },
  { timestamps: true }
);

/**
 * Valida un perfil crudo SIN conectarse a Mongo (sirve para el seed y para el catálogo
 * estático de respaldo). Devuelve un arreglo de mensajes; vacío = perfil válido.
 */
ProductoAgricolaSchema.statics.validarPerfil = function (datos) {
  const error = new this(datos).validateSync();
  if (!error) return [];
  return Object.values(error.errors).map((e) => `${e.path}: ${e.message}`);
};

module.exports = mongoose.model('ProductoAgricola', ProductoAgricolaSchema);