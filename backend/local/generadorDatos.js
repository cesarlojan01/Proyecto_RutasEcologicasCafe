/**
 * (USO LOCAL — esta carpeta no se sube al repositorio)
 * Generador de datos de carga para probar el módulo de ordenamiento.
 *
 * Crea registros con la MISMA estructura que guarda la aplicación (fincas, plantas
 * y evaluaciones de rutas) usando las fórmulas reales del proyecto (CO2, riesgo de
 * deterioro, estado de la vía y puntaje ecológico).
 *
 * Usa un generador pseudoaleatorio con SEMILLA (mulberry32): con la misma semilla
 * siempre produce exactamente los mismos datos → los experimentos son repetibles.
 *
 * Ejecutado directamente crea (o vuelve a crear) el archivo del dataset:
 *     node local/generadorDatos.js           -> local/dataset/rutas_evaluadas.json con 10 000 registros
 *     node local/generadorDatos.js 50000     -> lo mismo con 50 000 registros
 */
const fs = require('fs');
const path = require('path');
const { calcularEmisionesCO2 } = require('../src/utils/co2Calculator');
const { calcularRiesgoDeterioro } = require('../src/utils/deteriorationRisk');
const { evaluarEstadoCarretera } = require('../src/services/roadConditionService');
const { distanciaHaversineKm } = require('../src/services/osrmService');
const { PESOS } = require('../src/services/optimizacionService');
const { mergeSort, crearComparador } = require('../src/utils/ordenamiento');

// Zonas cafetaleras (centro aproximado de cada localidad) y plantas de procesamiento
const ZONAS_FINCAS = [
  { lugar: 'Zaruma', lat: -3.691, lng: -79.611, alt: 1200 },
  { lugar: 'Vilcabamba', lat: -4.262, lng: -79.222, alt: 1560 },
  { lugar: 'Quilanga', lat: -4.302, lng: -79.398, alt: 1800 },
  { lugar: 'Jipijapa', lat: -1.348, lng: -80.579, alt: 350 },
  { lugar: 'Nanegalito', lat: 0.066, lng: -78.68, alt: 1600 },
  { lugar: 'Palanda', lat: -4.648, lng: -79.13, alt: 1150 },
];

const PLANTAS = [
  { nombre: 'Planta Sur Loja', lat: -3.996, lng: -79.204 },
  { nombre: 'Planta Catamayo', lat: -3.986, lng: -79.358 },
  { nombre: 'Planta Costa Machala', lat: -3.258, lng: -79.955 },
  { nombre: 'Planta Manabí', lat: -1.054, lng: -80.454 },
  { nombre: 'Planta Norte Quito', lat: -0.18, lng: -78.467 },
];

const NOMBRES = ['El Cafetal', 'Vista Hermosa', 'La Esperanza', 'San José', 'Los Andes', 'El Mirador',
  'La Primavera', 'Santa Rosa', 'El Paraíso', 'Buenos Aires', 'La Florida', 'San Antonio'];

const CLIMAS_SECOS = ['cielo claro', 'nubes dispersas', 'muy nuboso'];
const CLIMAS_LLUVIA = ['lluvia ligera', 'lluvia moderada'];

/** Generador pseudoaleatorio con semilla (mulberry32) */
function crearAleatorio(semilla = 42) {
  let s = semilla >>> 0;
  return function aleatorio() {
    s = (s + 0x6d2b79f5) >>> 0;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const redondear = (x, d = 2) => Number(x.toFixed(d));
const elegir = (lista, r) => lista[Math.floor(r() * lista.length)];

/** Genera n fincas (estructura del modelo Finca) */
function generarFincas(n, semilla = 7) {
  const r = crearAleatorio(semilla);
  return Array.from({ length: n }, (_, i) => {
    const z = elegir(ZONAS_FINCAS, r);
    return {
      nombre: `Finca ${elegir(NOMBRES, r)} ${i + 1}`,
      propietario: `Productor ${i + 1}`,
      ubicacion: {
        lat: redondear(z.lat + (r() - 0.5) * 0.12, 5),
        lng: redondear(z.lng + (r() - 0.5) * 0.12, 5),
        direccion: z.lugar,
      },
      altitud: Math.round(z.alt + (r() - 0.5) * 400),
      produccionEstimadaKgDia: Math.round(100 + r() * 1400),
    };
  });
}

/** Genera las plantas de procesamiento (estructura del modelo Planta) */
function generarPlantas(semilla = 11) {
  const r = crearAleatorio(semilla);
  return PLANTAS.map((p) => ({
    nombre: p.nombre,
    ubicacion: { lat: p.lat, lng: p.lng },
    capacidadRecepcionKgDia: Math.round(2000 + r() * 6000),
  }));
}

/** Puntaje ecológico igual que en optimizacionService: min-max por indicador × peso */
function asignarPuntajeEcologico(rutas) {
  const indicadores = [
    ['distanciaKm', PESOS.distancia],
    ['duracionMin', PESOS.tiempo],
    ['emisionesCO2Kg', PESOS.emisionesCO2],
    ['riesgoDeterioro', PESOS.riesgoDeterioro],
    ['factorRiesgoCarretera', PESOS.estadoCarretera],
    ['variacionAltitud', PESOS.variacionAltitud],
  ];
  const puntajes = rutas.map(() => 0);
  for (const [campo, peso] of indicadores) {
    let min = Infinity;
    let max = -Infinity;
    for (const ruta of rutas) {
      if (ruta[campo] < min) min = ruta[campo];
      if (ruta[campo] > max) max = ruta[campo];
    }
    if (max === min) continue;
    rutas.forEach((ruta, i) => {
      puntajes[i] += ((ruta[campo] - min) / (max - min)) * peso;
    });
  }
  rutas.forEach((ruta, i) => {
    ruta.puntajeEcologico = redondear(puntajes[i] * 100);
  });
}

/**
 * Genera UNA evaluación como las que la aplicación guarda en el historial:
 * de 1 a 3 rutas alternativas entre una finca y una planta, con sus indicadores
 * y el puntaje ecológico, ordenadas de menor a mayor puntaje (MergeSort propio).
 */
function generarEvaluacion(origen, destino, altitudOrigen, r) {
  const recta = Math.max(distanciaHaversineKm(origen, destino), 2);
  const temperaturaBase = altitudOrigen > 1000 ? 14 + r() * 12 : 24 + r() * 8;
  const humedadBase = 55 + r() * 40;
  const lluviaBase = r() < 0.6 ? 0 : r() * 12;
  const cuantas = 1 + Math.floor(r() * 3);

  const rutas = [];
  for (let i = 0; i < cuantas; i++) {
    // Por carretera: entre 1.1 y 1.6 veces la línea recta, a 25–70 km/h
    const distanciaKm = redondear(recta * (1.1 + r() * 0.5));
    const duracionMin = redondear((distanciaKm / (25 + r() * 45)) * 60, 1);
    const { estado, factorRiesgo } = evaluarEstadoCarretera({ distanciaKm, duracionMin });
    const clima = {
      descripcion: elegir(lluviaBase > 0 ? CLIMAS_LLUVIA : CLIMAS_SECOS, r),
      temperatura: redondear(temperaturaBase + (r() - 0.5) * 2, 1),
      humedad: Math.round(Math.min(100, humedadBase + (r() - 0.5) * 6)),
      lluviaMm: redondear(lluviaBase, 1),
    };
    const variacionAltitud = Math.round(Math.abs(altitudOrigen - 400 * r()) * (0.5 + r()));
    rutas.push({
      resumen: `Ruta ${i + 1}`,
      distanciaKm,
      duracionMin,
      altitudPromedio: Math.round(altitudOrigen * (0.5 + r() * 0.5)),
      clima,
      estadoCarretera: estado,
      factorRiesgoCarretera: factorRiesgo,
      variacionAltitud,
      emisionesCO2Kg: calcularEmisionesCO2({ distanciaKm, factorRiesgoCarretera: factorRiesgo }),
      riesgoDeterioro: calcularRiesgoDeterioro({
        duracionMin,
        temperatura: clima.temperatura,
        humedad: clima.humedad,
        lluviaMm: clima.lluviaMm,
        factorRiesgoCarretera: factorRiesgo,
        variacionAltitud,
      }),
    });
  }

  asignarPuntajeEcologico(rutas);
  return mergeSort(rutas, crearComparador('puntajeEcologico:asc,riesgoDeterioro:asc,distanciaKm:asc'));
}

/**
 * Genera n rutas evaluadas "sueltas", con la misma forma que los registros del
 * historial que ordena la API. Sirve para probar sin base de datos.
 */
function generarRutasEvaluadas(n, semilla = 42) {
  const r = crearAleatorio(semilla);
  const inicio = Date.UTC(2026, 0, 1);
  const registros = [];
  while (registros.length < n) {
    const z = elegir(ZONAS_FINCAS, r);
    const p = elegir(PLANTAS, r);
    const fecha = new Date(inicio + Math.floor(r() * 300) * 86400000);
    const finca = `Finca ${elegir(NOMBRES, r)} (${z.lugar})`;
    for (const ruta of generarEvaluacion(z, p, z.alt, r)) {
      if (registros.length < n) registros.push({ ...ruta, id: `ruta_${registros.length + 1}`, fecha, finca, planta: p.nombre });
    }
  }
  return registros;
}

// ----------------------------------------------------------------------------
// Dataset en archivo (local/dataset/rutas_evaluadas.json)
// ----------------------------------------------------------------------------

const ARCHIVO_DATASET = path.join(__dirname, 'dataset', 'rutas_evaluadas.json');

/**
 * Crea el archivo del dataset: n rutas evaluadas con los mismos campos que la
 * aplicación guarda en el historial. Un registro por línea, para poder leerlo.
 */
function guardarDataset(n = 10000, semilla = 42) {
  const registros = generarRutasEvaluadas(n, semilla).map((r) => ({
    id: r.id,
    fecha: r.fecha.toISOString().slice(0, 10),
    finca: r.finca,
    planta: r.planta,
    resumen: r.resumen,
    distanciaKm: r.distanciaKm,
    duracionMin: r.duracionMin,
    altitudPromedio: r.altitudPromedio,
    clima: r.clima,
    estadoCarretera: r.estadoCarretera,
    riesgoDeterioro: r.riesgoDeterioro,
    emisionesCO2Kg: r.emisionesCO2Kg,
    puntajeEcologico: r.puntajeEcologico,
  }));
  fs.mkdirSync(path.dirname(ARCHIVO_DATASET), { recursive: true });
  fs.writeFileSync(ARCHIVO_DATASET, '[\n' + registros.map((r) => JSON.stringify(r)).join(',\n') + '\n]\n');
  return registros;
}

/** Lee el dataset del archivo; si todavía no existe, lo crea con 10 000 registros */
function cargarDataset() {
  if (!fs.existsSync(ARCHIVO_DATASET)) return guardarDataset();
  return JSON.parse(fs.readFileSync(ARCHIVO_DATASET, 'utf8'));
}

if (require.main === module) {
  const n = Number(process.argv[2]) || 10000;
  guardarDataset(n);
  console.log(`Dataset creado: ${n} rutas evaluadas en ${path.relative(process.cwd(), ARCHIVO_DATASET)}`);
}

module.exports = {
  crearAleatorio, generarFincas, generarPlantas, generarEvaluacion, generarRutasEvaluadas,
  guardarDataset, cargarDataset, ARCHIVO_DATASET, ZONAS_FINCAS, PLANTAS,
};
