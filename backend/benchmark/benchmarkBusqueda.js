/**
 * Benchmark: búsqueda secuencial vs binaria sobre arreglo en memoria.
 * Uso:  node benchmark/benchmarkBusqueda.js   (desde backend/)
 */
const fs = require('fs');
const path = require('path');
const { performance } = require('perf_hooks');
const { busquedaSecuencial, busquedaBinaria } = require('../src/utils/busqueda');

const VOLUMENES = [1000, 10000, 50000, 100000, 250000, 500000];
const CONSULTAS = 500;
const REPETICIONES = 5;
const SEED = 42;
const DIR_RESULTADOS = path.join(__dirname, 'resultados');

function prng(seed) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function medir(fn, arr, consultas) {
  fn(arr, consultas[0]); // warmup
  const tiempos = [];
  const comps = [];
  for (let i = 0; i < REPETICIONES; i++) {
    const t0 = performance.now();
    let totalComp = 0;
    for (const q of consultas) totalComp += fn(arr, q).comparaciones;
    tiempos.push(performance.now() - t0);
    comps.push(totalComp / consultas.length);
  }
  tiempos.sort((a, b) => a - b);
  comps.sort((a, b) => a - b);
  const m = Math.floor(tiempos.length / 2);
  return {
    tiempoPromedioMs: tiempos[m] / consultas.length,
    comparacionesPromedio: comps[m],
  };
}

function main() {
  if (!fs.existsSync(DIR_RESULTADOS)) fs.mkdirSync(DIR_RESULTADOS, { recursive: true });
  const resultados = [];

  console.log('Benchmark: Búsqueda secuencial vs binaria (50% claves existentes / 50% inexistentes)');
  for (const n of VOLUMENES) {
    const arr = Array.from({ length: n }, (_, i) => ({ id: i + 1 }));
    const rnd = prng(SEED);
    const consultas = Array.from({ length: CONSULTAS }, (_, i) =>
      i % 2 === 0 ? Math.floor(rnd() * n) + 1 : n + 1 + Math.floor(rnd() * 100)
    );

    const sec = medir(busquedaSecuencial, arr, consultas);
    const bin = medir(busquedaBinaria, arr, consultas);

    resultados.push({
      n,
      secuencial: sec,
      binaria: bin,
      aceleracion: Number((sec.tiempoPromedioMs / bin.tiempoPromedioMs).toFixed(2)),
      ratioComp: Number((sec.comparacionesPromedio / bin.comparacionesPromedio).toFixed(2)),
    });

    console.log(
      `  n=${n.toLocaleString('es')}: sec=${sec.tiempoPromedioMs.toFixed(4)}ms bin=${bin.tiempoPromedioMs.toFixed(4)}ms aceleración=${(sec.tiempoPromedioMs / bin.tiempoPromedioMs).toFixed(0)}×`
    );
  }

  fs.writeFileSync(
    path.join(DIR_RESULTADOS, 'benchmark-busqueda.json'),
    JSON.stringify({ fecha: new Date().toISOString(), seed: SEED, resultados }, null, 2)
  );
  console.log('\n✅ benchmark/resultados/benchmark-busqueda.json');
}

main();