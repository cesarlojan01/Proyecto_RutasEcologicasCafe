/**
 * Benchmark: MergeSort vs QuickSort vs Array.sort nativo.
 * Uso:  node benchmark/benchmarkOrdenamiento.js   (desde backend/)
 */
const fs = require('fs');
const path = require('path');
const { performance } = require('perf_hooks');
const { mergeSort, quickSort } = require('../src/utils/ordenamiento');

const VOLUMENES = [1000, 5000, 10000, 50000, 500000];
const REPETICIONES = 7;
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

function mediana(ns) {
  const o = [...ns].sort((a, b) => a - b);
  const m = Math.floor(o.length / 2);
  return o.length % 2 === 0 ? (o[m - 1] + o[m]) / 2 : o[m];
}

function medir(fn, arr, cmp) {
  fn(arr, cmp); // warmup
  const ts = [];
  for (let i = 0; i < REPETICIONES; i++) {
    const t0 = performance.now();
    fn(arr, cmp);
    ts.push(performance.now() - t0);
  }
  return mediana(ts);
}

function main() {
  if (!fs.existsSync(DIR_RESULTADOS)) fs.mkdirSync(DIR_RESULTADOS, { recursive: true });
  const cmp = (a, b) => a - b;
  const resultados = [];

  console.log('Benchmark: MergeSort vs QuickSort vs Array.sort nativo');
  for (const n of VOLUMENES) {
    const rnd = prng(SEED);
    const arr = Array.from({ length: n }, () => Math.floor(rnd() * 1e6));
    const tMerge = medir(mergeSort, arr, cmp);
    const tQuick = medir(quickSort, arr, cmp);
    const tNative = medir((a, c) => [...a].sort(c), arr, cmp);
    resultados.push({
      n,
      mergeSortMs: Number(tMerge.toFixed(4)),
      quickSortMs: Number(tQuick.toFixed(4)),
      nativeMs: Number(tNative.toFixed(4)),
    });
    console.log(`  n=${n.toLocaleString('es')}: merge=${tMerge.toFixed(2)}ms quick=${tQuick.toFixed(2)}ms native=${tNative.toFixed(2)}ms`);
  }

  fs.writeFileSync(
    path.join(DIR_RESULTADOS, 'benchmark-ordenamiento.json'),
    JSON.stringify({ fecha: new Date().toISOString(), seed: SEED, resultados }, null, 2)
  );
  console.log('\n✅ benchmark/resultados/benchmark-ordenamiento.json');
}

main();