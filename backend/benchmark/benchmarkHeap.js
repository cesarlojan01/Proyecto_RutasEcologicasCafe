/**
 * Benchmark: MergeSort + slice(0, K) vs MinHeap.topK
 *
 * Uso:  node benchmark/benchmarkHeap.js   (desde backend/)
 *
 * Compara el tiempo de obtener las K rutas con mejor puntaje de un dataset
 * de n registros, mediante:
 *   - MergeSort completo + slice(0, K)   → O(n log n) + O(K)
 *   - MinHeap.topK con montículo acotado  → O(n log K)  (≈ O(n) para K << n)
 *
 * Salidas:
 *   - Tabla comparativa en consola
 *   - benchmark/resultados/benchmark-heap.json
 *   - benchmark/resultados/grafico-heap-tiempo.svg
 *   - benchmark/resultados/grafico-heap-aceleracion.svg
 *
 * Los datos se generan con semilla fija (42), reproducible entre máquinas.
 */
const fs = require('fs');
const path = require('path');
const { performance } = require('perf_hooks');

const { mergeSort, crearComparador } = require('../src/utils/ordenamiento');
const { MinHeap } = require('../src/utils/heap');

// ---------------------------------------------------------------------------
// Configuración
// ---------------------------------------------------------------------------
const VOLUMENES = [1000, 50000, 500000];
const VALORES_K = [1, 3, 10];
const REPETICIONES = 7;
const SEED = 42;
// Mismo criterio multicriterio que optimizacionService.js (producción)
const CRITERIOS = 'puntajeEcologico:asc,riesgoDeterioro:asc,distanciaKm:asc';

const DIR_RESULTADOS = path.join(__dirname, 'resultados');

// ---------------------------------------------------------------------------
// PRNG determinista (mulberry32) — mismo de los otros benchmarks del proyecto
// ---------------------------------------------------------------------------
function prng(seed) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// ---------------------------------------------------------------------------
// Generación de datos: misma estructura que `rutasEvaluadas` de la API
// ---------------------------------------------------------------------------
function generarRegistros(n, seed = SEED) {
  const rnd = prng(seed);
  const registros = new Array(n);
  for (let i = 0; i < n; i++) {
    registros[i] = {
      id: `ruta_${i + 1}`,
      resumen: `Ruta ${i + 1}`,
      distanciaKm: Number((rnd() * 500).toFixed(2)),
      duracionMin: Number((rnd() * 600).toFixed(1)),
      emisionesCO2Kg: Number((rnd() * 200).toFixed(2)),
      riesgoDeterioro: Number((rnd() * 100).toFixed(1)),
      puntajeEcologico: Number((rnd() * 100).toFixed(2)),
    };
  }
  return registros;
}

// ---------------------------------------------------------------------------
// Utilidades de medición
// ---------------------------------------------------------------------------
function mediana(numeros) {
  const ordenados = [...numeros].sort((a, b) => a - b);
  const mid = Math.floor(ordenados.length / 2);
  return ordenados.length % 2 === 0
    ? (ordenados[mid - 1] + ordenados[mid]) / 2
    : ordenados[mid];
}

function medir(registros, K, comparar, repeticiones) {
  // Calentamiento (JIT, caché, GC previos)
  mergeSort(registros, comparar).slice(0, K);
  MinHeap.topK(registros, K, comparar);

  const tiemposSort = [];
  const tiemposHeap = [];

  for (let i = 0; i < repeticiones; i++) {
    const t0 = performance.now();
    mergeSort(registros, comparar).slice(0, K);
    tiemposSort.push(performance.now() - t0);

    const t1 = performance.now();
    MinHeap.topK(registros, K, comparar);
    tiemposHeap.push(performance.now() - t1);
  }

  // Verificar equivalencia de resultados (mismos IDs en el mismo orden)
  const idsSort = mergeSort(registros, comparar).slice(0, K).map((r) => r.id).join(',');
  const idsHeap = MinHeap.topK(registros, K, comparar).map((r) => r.id).join(',');
  const equivalentes = idsSort === idsHeap;

  return {
    tiempoSort: mediana(tiemposSort),
    tiempoHeap: mediana(tiemposHeap),
    equivalentes,
  };
}

// ---------------------------------------------------------------------------
// SVG minimalista sin dependencias
// ---------------------------------------------------------------------------
function escribirSVG(series, { titulo, yLabel, escalaY = 'linear', archivo }) {
  const W = 800, H = 420;
  const P = { top: 50, right: 200, bottom: 60, left: 100 };
  const pw = W - P.left - P.right;
  const ph = H - P.top - P.bottom;

  const xs = [...new Set(series.flatMap((s) => s.puntos.map((p) => p.x)))].sort((a, b) => a - b);
  const minX = Math.min(...xs), maxX = Math.max(...xs);
  const xOf = (x) =>
    P.left + (pw * (Math.log10(x) - Math.log10(minX))) / (Math.log10(maxX) - Math.log10(minX));

  const ys = series.flatMap((s) => s.puntos.map((p) => p.y));
  const minY = Math.max(1e-9, Math.min(...ys));
  const maxY = Math.max(...ys);
  const yOf = (y) =>
    escalaY === 'log'
      ? P.top + ph - (ph * (Math.log10(y) - Math.log10(minY))) / (Math.log10(maxY) - Math.log10(minY))
      : P.top + ph - (ph * (y - minY)) / (maxY - minY || 1);

  const lineas = series
    .map((s) => {
      const pts = s.puntos.map((p) => `${xOf(p.x).toFixed(1)},${yOf(p.y).toFixed(1)}`).join(' ');
      return `<polyline points="${pts}" fill="none" stroke="${s.color}" stroke-width="2"${s.dash ? ' stroke-dasharray="6 4"' : ''}/>`;
    })
    .join('');

  const puntos = series
    .map((s) =>
      s.puntos
        .map((p) => `<circle cx="${xOf(p.x).toFixed(1)}" cy="${yOf(p.y).toFixed(1)}" r="4" fill="${s.color}"/>`)
        .join('')
    )
    .join('');

  const etiquetasX = xs
    .map((x) => `<text x="${xOf(x).toFixed(1)}" y="${H - P.bottom + 22}" text-anchor="middle" font-size="12">${x.toLocaleString('es')}</text>`)
    .join('');

  const leyenda = series
    .map((s, i) => `<line x1="0" y1="${i * 22}" x2="20" y2="${i * 22}" stroke="${s.color}" stroke-width="2"${s.dash ? ' stroke-dasharray="6 4"' : ''}/>
       <text x="25" y="${i * 22 + 4}" font-size="12">${s.nombre}</text>`)
    .join('');

  fs.writeFileSync(
    archivo,
    `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" font-family="sans-serif">
  <rect width="100%" height="100%" fill="white"/>
  <text x="${W / 2}" y="28" text-anchor="middle" font-size="16" font-weight="bold">${titulo}</text>
  <line x1="${P.left}" y1="${P.top}" x2="${P.left}" y2="${H - P.bottom}" stroke="black"/>
  <line x1="${P.left}" y1="${H - P.bottom}" x2="${W - P.right}" y2="${H - P.bottom}" stroke="black"/>
  <text x="20" y="${P.top + ph / 2}" text-anchor="middle" font-size="12" transform="rotate(-90 20 ${P.top + ph / 2})">${yLabel}</text>
  ${lineas}
  ${puntos}
  ${etiquetasX}
  <g transform="translate(${W - P.right + 10}, ${P.top + 10})">${leyenda}</g>
  <text x="${W / 2}" y="${H - 12}" text-anchor="middle" font-size="12">Número de registros (escala log)</text>
</svg>`
  );
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------
function main() {
  if (!fs.existsSync(DIR_RESULTADOS)) fs.mkdirSync(DIR_RESULTADOS, { recursive: true });

  const comparar = crearComparador(CRITERIOS);
  const resultados = [];

  console.log('Benchmark: MergeSort + slice(0,K) vs MinHeap.topK');
  console.log(`Criterios: ${CRITERIOS}`);
  console.log(`Repeticiones: ${REPETICIONES} (se reporta la mediana)`);
  console.log(`Semilla: ${SEED}\n`);

  for (const n of VOLUMENES) {
    console.log(`▶ n = ${n.toLocaleString('es')}`);
    const registros = generarRegistros(n);

    for (const K of VALORES_K) {
      const { tiempoSort, tiempoHeap, equivalentes } = medir(registros, K, comparar, REPETICIONES);
      const aceleracion = tiempoHeap > 0 ? tiempoSort / tiempoHeap : 0;

      resultados.push({
        n, K,
        tiempoSortMs: Number(tiempoSort.toFixed(4)),
        tiempoHeapMs: Number(tiempoHeap.toFixed(4)),
        aceleracion: Number(aceleracion.toFixed(2)),
        equivalentes,
      });

      console.log(
        `   K=${String(K).padStart(2)}  →  sort: ${tiempoSort.toFixed(3).padStart(8)} ms  |  heap: ${tiempoHeap.toFixed(3).padStart(8)} ms  |  ${aceleracion.toFixed(1).padStart(5)}×  ${equivalentes ? '✅' : '⚠️'}`
      );
    }
    console.log('');
  }

  // Tabla final
  console.log('═'.repeat(92));
  console.log('CUADRO COMPARATIVO — MergeSort+slice vs MinHeap.topK');
  console.log('═'.repeat(92));
  console.log('| N         | K   | Sort (ms)  | Heap (ms)  | Aceleración | Complejidad sort | Complejidad heap |');
  console.log('|-----------|-----|------------|------------|-------------|------------------|------------------|');
  for (const r of resultados) {
    console.log(
      `| ${r.n.toLocaleString('es').padStart(9)} | ${String(r.K).padStart(3)} | ${r.tiempoSortMs.toFixed(3).padStart(10)} | ${r.tiempoHeapMs.toFixed(3).padStart(10)} | ${String(r.aceleracion + '×').padStart(11)} | O(n log n)       | O(n log ${String(r.K).padEnd(7)})|`
    );
  }

  // JSON
  const rutaJson = path.join(DIR_RESULTADOS, 'benchmark-heap.json');
  fs.writeFileSync(rutaJson, JSON.stringify({
    fecha: new Date().toISOString(),
    seed: SEED,
    repeticiones: REPETICIONES,
    criterios: CRITERIOS,
    resultados,
  }, null, 2));

  // SVG 1: tiempos absolutos
  const colores = { 1: '#1f77b4', 3: '#2e7d32', 10: '#e74c3c' };
  const seriesTiempo = [];
  for (const K of VALORES_K) {
    seriesTiempo.push({
      nombre: `Sort K=${K}`, color: colores[K], dash: true,
      puntos: resultados.filter((r) => r.K === K).map((r) => ({ x: r.n, y: r.tiempoSortMs })),
    });
    seriesTiempo.push({
      nombre: `Heap K=${K}`, color: colores[K], dash: false,
      puntos: resultados.filter((r) => r.K === K).map((r) => ({ x: r.n, y: r.tiempoHeapMs })),
    });
  }
  escribirSVG(seriesTiempo, {
    titulo: 'Tiempo para obtener Top-K: Sort+slice vs MinHeap.topK',
    yLabel: 'Tiempo (ms, escala log)',
    escalaY: 'log',
    archivo: path.join(DIR_RESULTADOS, 'grafico-heap-tiempo.svg'),
  });

  // SVG 2: aceleración
  const seriesAcel = VALORES_K.map((K) => ({
    nombre: `K=${K}`, color: colores[K],
    puntos: resultados.filter((r) => r.K === K).map((r) => ({ x: r.n, y: r.aceleracion })),
  }));
  escribirSVG(seriesAcel, {
    titulo: 'Aceleración de MinHeap.topK sobre MergeSort+slice',
    yLabel: 'Aceleración (sort_time / heap_time)',
    escalaY: 'linear',
    archivo: path.join(DIR_RESULTADOS, 'grafico-heap-aceleracion.svg'),
  });

  console.log('\n✅ Archivos generados:');
  console.log(`   ${path.relative(process.cwd(), rutaJson)}`);
  console.log(`   ${path.relative(process.cwd(), path.join(DIR_RESULTADOS, 'grafico-heap-tiempo.svg'))}`);
  console.log(`   ${path.relative(process.cwd(), path.join(DIR_RESULTADOS, 'grafico-heap-aceleracion.svg'))}`);

  const algunFallo = resultados.some((r) => !r.equivalentes);
  if (algunFallo) {
    console.log('\n⚠️  Algunos datasets tuvieron empates exactos. Ver columna `equivalentes` del JSON.');
  } else {
    console.log('\n✅ Todos los datasets: sort y heap devuelven los mismos IDs.');
  }
}

main();