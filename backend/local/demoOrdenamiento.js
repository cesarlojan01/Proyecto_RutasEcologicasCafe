/**
 * (USO LOCAL — esta carpeta no se sube al repositorio)
 * DEMOSTRACIÓN EN CONSOLA DEL MÓDULO DE ORDENAMIENTO, para las capturas del informe.
 *
 * Uso (dentro de backend/):
 *     node local/demoOrdenamiento.js
 *
 * Ordena el dataset ficticio de local/dataset/rutas_evaluadas.json (10 000 rutas
 * evaluadas con la misma estructura que el historial de la aplicación) y muestra:
 *   1) Los registros ANTES de ordenar y DESPUÉS de ordenar (MergeSort y QuickSort).
 *   2) Tabla comparativa de tiempo (ms) y memoria (process.memoryUsage().heapUsed):
 *        ANTES   = Array.sort() nativo (lo que usaba el proyecto)
 *        DESPUÉS = MergeSort y QuickSort implementados desde cero
 *   La tabla también se guarda en backend/local/resultados/.
 *
 * Opciones:
 *     --criterios=riesgoDeterioro:asc,emisionesCO2Kg:asc,distanciaKm:asc
 *     --tamanos=1000,5000          cantidades de registros para la tabla (por defecto: 1000, 5000 y todos)
 *     --mostrar=10                 filas que se imprimen en el antes/después
 *     --repeticiones=5
 *     --bd                         en lugar del archivo, lee el historial guardado en MongoDB
 *                                  (la base indicada en backend/.env)
 */

// La medición de memoria necesita poder forzar el recolector de basura (global.gc).
// Si el script se lanzó sin --expose-gc, se relanza a sí mismo con esa opción.
if (typeof global.gc !== 'function') {
  const { spawnSync } = require('child_process');
  const r = spawnSync(process.execPath, ['--expose-gc', __filename, ...process.argv.slice(2)], { stdio: 'inherit' });
  process.exit(r.status ?? 1);
}

const fs = require('fs');
const os = require('os');
const path = require('path');
const { performance } = require('perf_hooks');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });
const { mergeSort, quickSort, crearComparador, parsearCriterios, estaOrdenado } = require('../src/utils/ordenamiento');

// ---------------- Parámetros ----------------
const args = {};
for (const a of process.argv.slice(2)) {
  const [clave, ...valor] = a.replace(/^--/, '').split('=');
  args[clave] = valor.length ? valor.join('=') : true;
}
const CRITERIOS = args.criterios || 'riesgoDeterioro:asc,emisionesCO2Kg:asc,distanciaKm:asc';
const MOSTRAR = Number(args.mostrar || 10);
const REPETICIONES = Number(args.repeticiones || 5);

const linea = (c = '=') => console.log(c.repeat(100));
const MB = (bytes) => bytes / 1024 / 1024;
const miles = (n) => n.toLocaleString('es');

/** Obtiene los registros: el dataset del archivo, o el historial de MongoDB con --bd */
async function cargarRegistros() {
  if (!args.bd) {
    const { cargarDataset, ARCHIVO_DATASET } = require('./generadorDatos');
    return { origen: `dataset ${path.relative(process.cwd(), ARCHIVO_DATASET)}`, registros: cargarDataset() };
  }
  const mongoose = require('mongoose');
  const { cargarRegistros: cargarDeMongo } = require('../src/services/ordenamientoService');
  if (!process.env.MONGO_URI) throw new Error('Falta MONGO_URI en backend/.env');
  await mongoose.connect(process.env.MONGO_URI, { serverSelectionTimeoutMS: 5000 });
  try {
    const registros = await cargarDeMongo('historial');
    return { origen: `MongoDB, base "${mongoose.connection.name}", colección rutahistorials`, registros };
  } finally {
    await mongoose.disconnect();
  }
}

/** Filas resumidas para imprimir con console.table */
function vista(registros) {
  return registros.slice(0, MOSTRAR).map((r) => ({
    fecha: r.fecha instanceof Date ? r.fecha.toISOString().slice(0, 10) : String(r.fecha ?? '').slice(0, 10),
    finca: r.finca,
    planta: r.planta,
    'riesgo (0-100)': r.riesgoDeterioro,
    'CO2 (kg)': r.emisionesCO2Kg,
    'distancia (km)': r.distanciaKm,
    via: r.estadoCarretera,
  }));
}

function mediana(valores) {
  const s = mergeSort(valores, (a, b) => a - b);
  return s[Math.floor(s.length / 2)];
}

/**
 * Mide tiempo y memoria de un algoritmo.
 *  - heapUsed: memoria del heap de V8 justo al terminar de ordenar.
 *  - Δ heapUsed: heapUsed al terminar − heapUsed antes de empezar (tras forzar GC).
 *    Incluye la copia del arreglo, el arreglo auxiliar (MergeSort) y los objetos
 *    temporales de las comparaciones que el recolector de basura aún no ha liberado.
 */
function medir(ordenar, datos, comparar) {
  ordenar(datos, comparar); // calentamiento (compilación JIT)
  const tiempos = [];
  const heaps = [];
  const deltas = [];
  let correcto = true;

  for (let i = 0; i < REPETICIONES; i++) {
    global.gc();
    const heapAntes = process.memoryUsage().heapUsed;
    const t0 = performance.now();
    const resultado = ordenar(datos, comparar);
    const ms = performance.now() - t0;
    const heapDespues = process.memoryUsage().heapUsed;

    tiempos.push(ms);
    heaps.push(heapDespues);
    deltas.push(heapDespues - heapAntes);
    correcto = correcto && resultado.length === datos.length && estaOrdenado(resultado, comparar);
  }
  return { tiempoMs: mediana(tiempos), heapUsed: mediana(heaps), delta: mediana(deltas), correcto };
}

async function main() {
  const comparar = crearComparador(CRITERIOS);
  const { origen, registros } = await cargarRegistros();

  if (registros.length < 2) {
    console.log(`Solo hay ${registros.length} rutas evaluadas: no hay nada que ordenar.`);
    console.log('Con --bd: evalúe rutas en la aplicación o cargue datos con  node local/poblarDatos.js');
    console.log('Sin --bd: vuelva a crear el dataset con  node local/generadorDatos.js');
    return;
  }

  // ============ 1) ANTES Y DESPUÉS DEL ORDENAMIENTO ============
  linea();
  console.log('MÓDULO DE ORDENAMIENTO — Ruta Ecológica Café');
  console.log(`Datos: ${miles(registros.length)} rutas evaluadas | ${origen}`);
  console.log(`Criterios: ${parsearCriterios(CRITERIOS).map((c, i) => `${i + 1}) ${c.campo} ${c.orden.toUpperCase()}`).join('   ')}`);
  linea();

  console.log(`\nANTES DEL ORDENAMIENTO (primeros ${MOSTRAR} registros, en el orden en que están guardados)`);
  console.table(vista(registros));
  console.log(`¿Está ordenado según los criterios?  ${estaOrdenado(registros, comparar) ? 'SÍ' : 'NO'}`);

  for (const [nombre, ordenar] of [['MergeSort', mergeSort], ['QuickSort', quickSort]]) {
    const ordenado = ordenar(registros, comparar);
    console.log(`\nDESPUÉS DEL ORDENAMIENTO con ${nombre} (primeros ${MOSTRAR} registros)`);
    console.table(vista(ordenado));
    console.log(
      `¿Está ordenado según los criterios?  ${estaOrdenado(ordenado, comparar) ? 'SÍ' : 'NO'}` +
      `   |   registros ordenados: ${miles(ordenado.length)}`
    );
  }

  // ============ 2) TABLA COMPARATIVA ============
  const ALGORITMOS = [
    { etapa: 'ANTES', nombre: 'Array.sort() nativo', ordenar: (d, c) => d.slice().sort(c) },
    { etapa: 'DESPUÉS', nombre: 'MergeSort (propio)', ordenar: mergeSort },
    { etapa: 'DESPUÉS', nombre: 'QuickSort (propio)', ordenar: quickSort },
  ];

  const pedidos = args.tamanos ? String(args.tamanos).split(',').map(Number) : [1000, 5000, registros.length];
  const tamanos = [];
  for (const n of pedidos) {
    const valido = Math.min(Math.max(Math.floor(n) || 0, 2), registros.length);
    if (!tamanos.includes(valido)) tamanos.push(valido);
  }

  console.log('');
  linea();
  console.log('TABLA COMPARATIVA — ANTES (Array.sort nativo) vs DESPUÉS (MergeSort / QuickSort propios)');
  console.log(`Mediana de ${REPETICIONES} ejecuciones | memoria: process.memoryUsage().heapUsed | Node ${process.version} | ${os.cpus()[0].model.trim()}`);
  linea();

  const filas = [];
  for (const n of mergeSort(tamanos, (a, b) => a - b)) {
    const datos = registros.slice(0, n);
    for (const alg of ALGORITMOS) {
      const m = medir(alg.ordenar, datos, comparar);
      filas.push({
        Registros: n,
        Etapa: alg.etapa,
        Algoritmo: alg.nombre,
        'Tiempo (ms)': Number(m.tiempoMs.toFixed(3)),
        'heapUsed (MB)': Number(MB(m.heapUsed).toFixed(2)),
        'Δ heapUsed (MB)': Number(MB(m.delta).toFixed(2)),
        'Ordenado OK': m.correcto ? 'sí' : 'NO',
      });
    }
  }
  console.table(filas);

  // ---------------- Guardar la tabla (solo en local) ----------------
  const carpeta = path.join(__dirname, 'resultados');
  fs.mkdirSync(carpeta, { recursive: true });
  const columnas = Object.keys(filas[0]);
  fs.writeFileSync(
    path.join(carpeta, 'comparativa_antes_despues.csv'),
    [columnas.join(','), ...filas.map((f) => columnas.map((c) => `"${f[c]}"`).join(','))].join('\n') + '\n'
  );
  fs.writeFileSync(
    path.join(carpeta, 'comparativa_antes_despues.md'),
    [
      `Criterios: \`${CRITERIOS}\` — mediana de ${REPETICIONES} ejecuciones — Node ${process.version}`,
      '',
      `| ${columnas.join(' | ')} |`,
      `| ${columnas.map(() => '---').join(' | ')} |`,
      ...filas.map((f) => `| ${columnas.map((c) => f[c]).join(' | ')} |`),
      '',
    ].join('\n')
  );
  console.log('Tabla guardada en backend/local/resultados/ (comparativa_antes_despues.csv y .md)');
}

main().catch((error) => {
  console.error(`\nError: ${error.message}`);
  if (args.bd) {
    console.error('No se pudo leer MongoDB. Verifique que esté en ejecución y el MONGO_URI de backend/.env,');
    console.error('o ejecute sin --bd para usar el dataset del archivo.');
  }
  process.exitCode = 1;
});
