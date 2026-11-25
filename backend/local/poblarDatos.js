/**
 * (USO LOCAL — esta carpeta no se sube al repositorio)
 * Guarda datos de carga en MongoDB para poder medir el módulo de ordenamiento
 * con un volumen de registros suficiente.
 *
 * Uso (dentro de backend/):
 *   node local/poblarDatos.js                -> 500 fincas, 5 plantas y 5000 evaluaciones
 *   node local/poblarDatos.js 1000 20000     -> 1000 fincas y 20000 evaluaciones
 *   node local/poblarDatos.js --borrar       -> elimina SOLO los datos creados por este script
 *
 * Usa la base indicada en backend/.env (MONGO_URI). Las fincas y plantas creadas
 * llevan contacto = "[prueba]" para poder borrarlas después sin tocar los datos reales.
 */
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });
const mongoose = require('mongoose');
const Finca = require('../src/models/Finca');
const Planta = require('../src/models/Planta');
const RutaHistorial = require('../src/models/RutaHistorial');
const { generarFincas, generarPlantas, generarEvaluacion, crearAleatorio } = require('./generadorDatos');

const MARCA = '[prueba]';

/** Arma n documentos del historial entre fincas y plantas ya guardadas (con _id) */
function construirEvaluaciones(fincas, plantas, n, semilla = 2026) {
  const r = crearAleatorio(semilla);
  const inicio = Date.UTC(2026, 0, 1);
  const documentos = [];
  for (let i = 0; i < n; i++) {
    const finca = fincas[Math.floor(r() * fincas.length)];
    const planta = plantas[Math.floor(r() * plantas.length)];
    const rutas = generarEvaluacion(finca.ubicacion, planta.ubicacion, finca.altitud, r);
    documentos.push({
      finca: finca._id,
      planta: planta._id,
      origen: { lat: finca.ubicacion.lat, lng: finca.ubicacion.lng },
      destino: { lat: planta.ubicacion.lat, lng: planta.ubicacion.lng },
      // Solo los campos que define el modelo RutaHistorial
      rutasEvaluadas: rutas.map((x) => ({
        resumen: x.resumen,
        distanciaKm: x.distanciaKm,
        duracionMin: x.duracionMin,
        altitudPromedio: x.altitudPromedio,
        clima: x.clima,
        estadoCarretera: x.estadoCarretera,
        riesgoDeterioro: x.riesgoDeterioro,
        emisionesCO2Kg: x.emisionesCO2Kg,
        puntajeEcologico: x.puntajeEcologico,
      })),
      rutaSeleccionada: { resumen: rutas[0].resumen, puntajeEcologico: rutas[0].puntajeEcologico },
      createdAt: new Date(inicio + Math.floor(r() * 300 * 24 * 60) * 60000),
    });
  }
  return documentos;
}

async function borrar() {
  const idsFincas = await Finca.find({ contacto: MARCA }).distinct('_id');
  const h = await RutaHistorial.deleteMany({ finca: { $in: idsFincas } });
  const f = await Finca.deleteMany({ contacto: MARCA });
  const p = await Planta.deleteMany({ contacto: MARCA });
  console.log(`Borrados: ${f.deletedCount} fincas, ${p.deletedCount} plantas y ${h.deletedCount} evaluaciones de prueba`);
}

async function poblar(nFincas, nEvaluaciones) {
  const plantas = await Planta.insertMany(generarPlantas().map((p) => ({ ...p, contacto: MARCA })));
  const fincas = await Finca.insertMany(generarFincas(nFincas).map((f) => ({ ...f, contacto: MARCA })));
  console.log(`Insertadas ${plantas.length} plantas y ${fincas.length} fincas`);

  const evaluaciones = construirEvaluaciones(fincas, plantas, nEvaluaciones);
  let rutas = 0;
  for (let i = 0; i < evaluaciones.length; i += 1000) {
    const lote = evaluaciones.slice(i, i + 1000);
    await RutaHistorial.insertMany(lote);
    for (const e of lote) rutas += e.rutasEvaluadas.length;
  }
  console.log(`Insertadas ${evaluaciones.length} evaluaciones (${rutas} rutas evaluadas en total)`);
}

async function main() {
  const uri = process.env.MONGO_URI;
  if (!uri) throw new Error('Falta MONGO_URI en backend/.env');
  await mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 });
  console.log(`Conectado a MongoDB (base "${mongoose.connection.name}")`);

  if (process.argv.includes('--borrar')) return borrar();
  const numeros = process.argv.slice(2).filter((a) => /^\d+$/.test(a)).map(Number);
  return poblar(numeros[0] || 500, numeros[1] || 5000);
}

if (require.main === module) {
  main()
    .catch((e) => {
      console.error('Error:', e.message);
      process.exitCode = 1;
    })
    .finally(() => mongoose.disconnect());
}

module.exports = { construirEvaluaciones, MARCA };
