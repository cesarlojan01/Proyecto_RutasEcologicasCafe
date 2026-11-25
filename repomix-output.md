This file is a merged representation of the entire codebase, combined into a single document by Repomix.

# File Summary

## Purpose
This file contains a packed representation of the entire repository's contents.
It is designed to be easily consumable by AI systems for analysis, code review,
or other automated processes.

## File Format
The content is organized as follows:
1. This summary section
2. Repository information
3. Directory structure
4. Repository files (if enabled)
5. Multiple file entries, each consisting of:
  a. A header with the file path (## File: path/to/file)
  b. The full contents of the file in a code block

## Usage Guidelines
- This file should be treated as read-only. Any changes should be made to the
  original repository files, not this packed version.
- When processing this file, use the file path to distinguish
  between different files in the repository.
- Be aware that this file may contain sensitive information. Handle it with
  the same level of security as you would the original repository.

## Notes
- Some files may have been excluded based on .gitignore rules and Repomix's configuration
- Binary files are not included in this packed representation. Please refer to the Repository Structure section for a complete list of file paths, including binary files
- Files matching patterns in .gitignore are excluded
- Files matching default ignore patterns are excluded
- Files are sorted by Git change count (files with more changes are at the bottom)

# Directory Structure
```
backend/
  benchmark/
    resultados/
      benchmark-busqueda.json
      benchmark-heap.json
      benchmark-ordenamiento.json
      grafico-heap-aceleracion.svg
      grafico-heap-tiempo.svg
    benchmarkBusqueda.js
    benchmarkHeap.js
    benchmarkOrdenamiento.js
  src/
    config/
      db.js
    data/
      productos/
        cafe.js
        index.js
    models/
      Finca.js
      Planta.js
      ProductoAgricola.js
      RutaHistorial.js
    routes/
      fincas.routes.js
      ordenamiento.routes.js
      plantas.routes.js
      rutas.routes.js
    services/
      elevationService.js
      optimizacionService.js
      ordenamientoService.js
      osrmService.js
      productoService.js
      roadConditionService.js
      weatherService.js
    test/
      fixtures/
        unidad1.js
      busqueda.test.js
      co2Calculator.test.js
      deteriorationRisk.propiedades.test.js
      heap.test.js
      ordenamiento.test.js
    utils/
      busqueda.js
      co2Calculator.js
      deteriorationRisk.js
      heap.js
      ordenamiento.js
  .env.example
  package.json
  server.js
frontend/
  public/
    index.html
  src/
    api/
      api.js
    components/
      FincaForm.jsx
      Header.jsx
      MapSelector.jsx
      PlantaForm.jsx
      RouteResults.jsx
    utils/
      criterios.js
      polyline.js
      routeColors.js
    App.js
    index.css
    index.js
  .env.example
  package.json
.gitignore
README.md
```

# Files

## File: backend/benchmark/resultados/benchmark-busqueda.json
```json
{
  "fecha": "2026-11-25T23:25:47.356Z",
  "seed": 42,
  "resultados": [
    {
      "n": 1000,
      "secuencial": {
        "tiempoPromedioMs": 0.0016032000000000153,
        "comparacionesPromedio": 742.784
      },
      "binaria": {
        "tiempoPromedioMs": 0.0006453999999999951,
        "comparacionesPromedio": 9.436
      },
      "aceleracion": 2.48,
      "ratioComp": 78.72
    },
    {
      "n": 10000,
      "secuencial": {
        "tiempoPromedioMs": 0.012912800000000004,
        "comparacionesPromedio": 7425.698
      },
      "binaria": {
        "tiempoPromedioMs": 0.0005785999999999944,
        "comparacionesPromedio": 13.15
      },
      "aceleracion": 22.32,
      "ratioComp": 564.69
    },
    {
      "n": 50000,
      "secuencial": {
        "tiempoPromedioMs": 0.06326280000000002,
        "comparacionesPromedio": 37127.502
      },
      "binaria": {
        "tiempoPromedioMs": 0.0005971999999999298,
        "comparacionesPromedio": 15.378
      },
      "aceleracion": 105.93,
      "ratioComp": 2414.33
    },
    {
      "n": 100000,
      "secuencial": {
        "tiempoPromedioMs": 0.3534689999999998,
        "comparacionesPromedio": 74254.766
      },
      "binaria": {
        "tiempoPromedioMs": 0.00017219999999997526,
        "comparacionesPromedio": 16.338
      },
      "aceleracion": 2052.67,
      "ratioComp": 4544.91
    },
    {
      "n": 250000,
      "secuencial": {
        "tiempoPromedioMs": 0.6971502,
        "comparacionesPromedio": 185636.504
      },
      "binaria": {
        "tiempoPromedioMs": 0.0002863999999999578,
        "comparacionesPromedio": 17.448
      },
      "aceleracion": 2434.18,
      "ratioComp": 10639.41
    },
    {
      "n": 500000,
      "secuencial": {
        "tiempoPromedioMs": 1.6475915999999997,
        "comparacionesPromedio": 371272.772
      },
      "binaria": {
        "tiempoPromedioMs": 0.00030540000000110014,
        "comparacionesPromedio": 18.51
      },
      "aceleracion": 5394.86,
      "ratioComp": 20057.96
    }
  ]
}
```

## File: backend/benchmark/resultados/benchmark-heap.json
```json
{
  "fecha": "2026-11-25T23:26:44.949Z",
  "seed": 42,
  "repeticiones": 7,
  "criterios": "puntajeEcologico:asc,riesgoDeterioro:asc,distanciaKm:asc",
  "resultados": [
    {
      "n": 1000,
      "K": 1,
      "tiempoSortMs": 1.1706,
      "tiempoHeapMs": 0.3323,
      "aceleracion": 3.52,
      "equivalentes": true
    },
    {
      "n": 1000,
      "K": 3,
      "tiempoSortMs": 0.8853,
      "tiempoHeapMs": 0.3316,
      "aceleracion": 2.67,
      "equivalentes": true
    },
    {
      "n": 1000,
      "K": 10,
      "tiempoSortMs": 0.8524,
      "tiempoHeapMs": 0.2498,
      "aceleracion": 3.41,
      "equivalentes": true
    },
    {
      "n": 50000,
      "K": 1,
      "tiempoSortMs": 117.6233,
      "tiempoHeapMs": 4.6865,
      "aceleracion": 25.1,
      "equivalentes": true
    },
    {
      "n": 50000,
      "K": 3,
      "tiempoSortMs": 106.5345,
      "tiempoHeapMs": 5.4295,
      "aceleracion": 19.62,
      "equivalentes": true
    },
    {
      "n": 50000,
      "K": 10,
      "tiempoSortMs": 121.8753,
      "tiempoHeapMs": 5.2299,
      "aceleracion": 23.3,
      "equivalentes": true
    },
    {
      "n": 500000,
      "K": 1,
      "tiempoSortMs": 1433.0679,
      "tiempoHeapMs": 28.9412,
      "aceleracion": 49.52,
      "equivalentes": true
    },
    {
      "n": 500000,
      "K": 3,
      "tiempoSortMs": 2011.6857,
      "tiempoHeapMs": 45.7945,
      "aceleracion": 43.93,
      "equivalentes": true
    },
    {
      "n": 500000,
      "K": 10,
      "tiempoSortMs": 2285.6982,
      "tiempoHeapMs": 46.7507,
      "aceleracion": 48.89,
      "equivalentes": true
    }
  ]
}
```

## File: backend/benchmark/resultados/benchmark-ordenamiento.json
```json
{
  "fecha": "2026-11-25T23:25:39.660Z",
  "seed": 42,
  "resultados": [
    {
      "n": 1000,
      "mergeSortMs": 0.1948,
      "quickSortMs": 0.1654,
      "nativeMs": 0.2622
    },
    {
      "n": 5000,
      "mergeSortMs": 1.3274,
      "quickSortMs": 0.6046,
      "nativeMs": 1.5805
    },
    {
      "n": 10000,
      "mergeSortMs": 2.0631,
      "quickSortMs": 1.3599,
      "nativeMs": 3.4032
    },
    {
      "n": 50000,
      "mergeSortMs": 11.8853,
      "quickSortMs": 7.7933,
      "nativeMs": 20.0428
    },
    {
      "n": 500000,
      "mergeSortMs": 139.5291,
      "quickSortMs": 84.5505,
      "nativeMs": 236.2648
    }
  ]
}
```

## File: backend/benchmark/resultados/grafico-heap-aceleracion.svg
```xml
<svg xmlns="http://www.w3.org/2000/svg" width="800" height="420" font-family="sans-serif">
  <rect width="100%" height="100%" fill="white"/>
  <text x="400" y="28" text-anchor="middle" font-size="16" font-weight="bold">Aceleración de MinHeap.topK sobre MergeSort+slice</text>
  <line x1="100" y1="50" x2="100" y2="360" stroke="black"/>
  <line x1="100" y1="360" x2="600" y2="360" stroke="black"/>
  <text x="20" y="205" text-anchor="middle" font-size="12" transform="rotate(-90 20 205)">Aceleración (sort_time / heap_time)</text>
  <polyline points="100.0,354.4 414.7,211.6 600.0,50.0" fill="none" stroke="#1f77b4" stroke-width="2"/><polyline points="100.0,360.0 414.7,247.8 600.0,87.0" fill="none" stroke="#2e7d32" stroke-width="2"/><polyline points="100.0,355.1 414.7,223.5 600.0,54.2" fill="none" stroke="#e74c3c" stroke-width="2"/>
  <circle cx="100.0" cy="354.4" r="4" fill="#1f77b4"/><circle cx="414.7" cy="211.6" r="4" fill="#1f77b4"/><circle cx="600.0" cy="50.0" r="4" fill="#1f77b4"/><circle cx="100.0" cy="360.0" r="4" fill="#2e7d32"/><circle cx="414.7" cy="247.8" r="4" fill="#2e7d32"/><circle cx="600.0" cy="87.0" r="4" fill="#2e7d32"/><circle cx="100.0" cy="355.1" r="4" fill="#e74c3c"/><circle cx="414.7" cy="223.5" r="4" fill="#e74c3c"/><circle cx="600.0" cy="54.2" r="4" fill="#e74c3c"/>
  <text x="100.0" y="382" text-anchor="middle" font-size="12">1000</text><text x="414.7" y="382" text-anchor="middle" font-size="12">50.000</text><text x="600.0" y="382" text-anchor="middle" font-size="12">500.000</text>
  <g transform="translate(610, 60)"><line x1="0" y1="0" x2="20" y2="0" stroke="#1f77b4" stroke-width="2"/>
       <text x="25" y="4" font-size="12">K=1</text><line x1="0" y1="22" x2="20" y2="22" stroke="#2e7d32" stroke-width="2"/>
       <text x="25" y="26" font-size="12">K=3</text><line x1="0" y1="44" x2="20" y2="44" stroke="#e74c3c" stroke-width="2"/>
       <text x="25" y="48" font-size="12">K=10</text></g>
  <text x="400" y="408" text-anchor="middle" font-size="12">Número de registros (escala log)</text>
</svg>
```

## File: backend/benchmark/resultados/grafico-heap-tiempo.svg
```xml
<svg xmlns="http://www.w3.org/2000/svg" width="800" height="420" font-family="sans-serif">
  <rect width="100%" height="100%" fill="white"/>
  <text x="400" y="28" text-anchor="middle" font-size="16" font-weight="bold">Tiempo para obtener Top-K: Sort+slice vs MinHeap.topK</text>
  <line x1="100" y1="50" x2="100" y2="360" stroke="black"/>
  <line x1="100" y1="360" x2="600" y2="360" stroke="black"/>
  <text x="20" y="205" text-anchor="middle" font-size="12" transform="rotate(-90 20 205)">Tiempo (ms, escala log)</text>
  <polyline points="100.0,307.5 414.7,150.8 600.0,65.9" fill="none" stroke="#1f77b4" stroke-width="2" stroke-dasharray="6 4"/><polyline points="100.0,350.3 414.7,260.4 600.0,198.5" fill="none" stroke="#1f77b4" stroke-width="2"/><polyline points="100.0,317.0 414.7,154.2 600.0,54.3" fill="none" stroke="#2e7d32" stroke-width="2" stroke-dasharray="6 4"/><polyline points="100.0,350.4 414.7,255.4 600.0,182.9" fill="none" stroke="#2e7d32" stroke-width="2"/><polyline points="100.0,318.3 414.7,149.6 600.0,50.0" fill="none" stroke="#e74c3c" stroke-width="2" stroke-dasharray="6 4"/><polyline points="100.0,360.0 414.7,256.6 600.0,182.2" fill="none" stroke="#e74c3c" stroke-width="2"/>
  <circle cx="100.0" cy="307.5" r="4" fill="#1f77b4"/><circle cx="414.7" cy="150.8" r="4" fill="#1f77b4"/><circle cx="600.0" cy="65.9" r="4" fill="#1f77b4"/><circle cx="100.0" cy="350.3" r="4" fill="#1f77b4"/><circle cx="414.7" cy="260.4" r="4" fill="#1f77b4"/><circle cx="600.0" cy="198.5" r="4" fill="#1f77b4"/><circle cx="100.0" cy="317.0" r="4" fill="#2e7d32"/><circle cx="414.7" cy="154.2" r="4" fill="#2e7d32"/><circle cx="600.0" cy="54.3" r="4" fill="#2e7d32"/><circle cx="100.0" cy="350.4" r="4" fill="#2e7d32"/><circle cx="414.7" cy="255.4" r="4" fill="#2e7d32"/><circle cx="600.0" cy="182.9" r="4" fill="#2e7d32"/><circle cx="100.0" cy="318.3" r="4" fill="#e74c3c"/><circle cx="414.7" cy="149.6" r="4" fill="#e74c3c"/><circle cx="600.0" cy="50.0" r="4" fill="#e74c3c"/><circle cx="100.0" cy="360.0" r="4" fill="#e74c3c"/><circle cx="414.7" cy="256.6" r="4" fill="#e74c3c"/><circle cx="600.0" cy="182.2" r="4" fill="#e74c3c"/>
  <text x="100.0" y="382" text-anchor="middle" font-size="12">1000</text><text x="414.7" y="382" text-anchor="middle" font-size="12">50.000</text><text x="600.0" y="382" text-anchor="middle" font-size="12">500.000</text>
  <g transform="translate(610, 60)"><line x1="0" y1="0" x2="20" y2="0" stroke="#1f77b4" stroke-width="2" stroke-dasharray="6 4"/>
       <text x="25" y="4" font-size="12">Sort K=1</text><line x1="0" y1="22" x2="20" y2="22" stroke="#1f77b4" stroke-width="2"/>
       <text x="25" y="26" font-size="12">Heap K=1</text><line x1="0" y1="44" x2="20" y2="44" stroke="#2e7d32" stroke-width="2" stroke-dasharray="6 4"/>
       <text x="25" y="48" font-size="12">Sort K=3</text><line x1="0" y1="66" x2="20" y2="66" stroke="#2e7d32" stroke-width="2"/>
       <text x="25" y="70" font-size="12">Heap K=3</text><line x1="0" y1="88" x2="20" y2="88" stroke="#e74c3c" stroke-width="2" stroke-dasharray="6 4"/>
       <text x="25" y="92" font-size="12">Sort K=10</text><line x1="0" y1="110" x2="20" y2="110" stroke="#e74c3c" stroke-width="2"/>
       <text x="25" y="114" font-size="12">Heap K=10</text></g>
  <text x="400" y="408" text-anchor="middle" font-size="12">Número de registros (escala log)</text>
</svg>
```

## File: backend/benchmark/benchmarkBusqueda.js
```javascript
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
```

## File: backend/benchmark/benchmarkHeap.js
```javascript
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
```

## File: backend/benchmark/benchmarkOrdenamiento.js
```javascript
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
```

## File: backend/src/data/productos/index.js
```javascript
const fs = require('fs');
const path = require('path');
const ProductoAgricola = require('../../models/ProductoAgricola');

function congelarProfundo(obj) {
  Object.values(obj).forEach((v) => {
    if (v && typeof v === 'object') congelarProfundo(v);
  });
  return Object.freeze(obj);
}

/**
 * @param {string} [dir] carpeta a leer (parametrizable para poder probar casos inválidos)
 * @returns {Map<string, Object>} slug -> perfil congelado
 */
function cargarCatalogo(dir = __dirname) {
  const archivos = fs
    .readdirSync(dir)
    .filter((f) => f.toLowerCase().endsWith('.js') && f.toLowerCase() !== 'index.js' && !f.startsWith('_'))
    .sort();

  const catalogo = new Map();
  const errores = [];

  for (const archivo of archivos) {
    const esperado = path.basename(archivo, '.js');
    let perfil;
    try {
      perfil = require(path.join(dir, archivo));
    } catch (e) {
      errores.push(`${archivo}: no se pudo cargar (${e.message})`);
      continue;
    }
    if (perfil.slug !== esperado) {
      errores.push(`${archivo}: slug "${perfil.slug}" debe coincidir con el nombre del archivo ("${esperado}")`);
    }
    const erroresEsquema = ProductoAgricola.validarPerfil(perfil);
    if (erroresEsquema.length) {
      errores.push(`${archivo}: ${erroresEsquema.join(' | ')}`);
    }
    catalogo.set(esperado, perfil);
  }

  if (errores.length) {
    throw new Error(`Catálogo de productos inválido:\n - ${errores.join('\n - ')}`);
  }
  catalogo.forEach((perfil) => congelarProfundo(perfil));
  return catalogo;
}

module.exports = { cargarCatalogo };
```

## File: backend/src/test/busqueda.test.js
```javascript
const { test } = require('node:test');
const assert = require('node:assert');
const { busquedaSecuencial, busquedaBinaria } = require('../utils/busqueda');
const { crearComparador, mergeSort } = require('../utils/ordenamiento');

// ─── Secuencial ───
test('Secuencial: encuentra clave existente', () => {
  const arr = [{ id: 1 }, { id: 2 }, { id: 3 }];
  assert.deepStrictEqual(busquedaSecuencial(arr, 2), { indice: 1, comparaciones: 2 });
});

test('Secuencial: no encuentra clave inexistente', () => {
  const arr = [{ id: 1 }, { id: 2 }, { id: 3 }];
  assert.deepStrictEqual(busquedaSecuencial(arr, 9), { indice: -1, comparaciones: 3 });
});

test('Secuencial: arreglo vacío', () => {
  assert.deepStrictEqual(busquedaSecuencial([], 5), { indice: -1, comparaciones: 0 });
});

// ─── Binaria ───
test('Binaria: encuentra clave existente (numérico)', () => {
  const arr = [{ id: 1 }, { id: 3 }, { id: 5 }, { id: 7 }];
  assert.strictEqual(busquedaBinaria(arr, 5).indice, 2);
});

test('Binaria: no encuentra clave inexistente (numérico)', () => {
  const arr = [{ id: 1 }, { id: 3 }, { id: 5 }];
  assert.strictEqual(busquedaBinaria(arr, 4).indice, -1);
});

test('Binaria: un elemento que existe', () => {
  assert.strictEqual(busquedaBinaria([{ id: 5 }], 5).indice, 0);
});

test('Binaria: un elemento que no existe', () => {
  assert.strictEqual(busquedaBinaria([{ id: 5 }], 3).indice, -1);
});

test('Binaria: comparaciones logarítmicas con 500.000', () => {
  const arr = Array.from({ length: 500000 }, (_, i) => ({ id: i }));
  const r = busquedaBinaria(arr, 250000);
  assert.strictEqual(r.indice, 250000);
  assert.ok(r.comparaciones <= 20, `esperaba ≤20 comparaciones, dio ${r.comparaciones}`);
});

// ─── Binaria con comparador (fix #6) ───
test('Binaria con comparador Intl.Collator: encuentra las 10 de texto', () => {
  const palabras = ['Ana', 'José', 'Luis', 'María', 'Pedro', 'Sofía', 'Zoe', 'Ángel', 'Íñigo', 'Óscar'];
  const cmpCampo = crearComparador([{ campo: 'n', orden: 'asc' }]);
  const arr = mergeSort(palabras.map((n) => ({ n })), cmpCampo);
  const cmpClaves = (a, b) => cmpCampo({ n: a }, { n: b });
  for (const p of palabras) {
    const r = busquedaBinaria(arr, p, (o) => o.n, cmpClaves);
    assert.ok(r.indice >= 0, `no encontró "${p}" con comparador Intl.Collator`);
  }
});
```

## File: backend/src/test/heap.test.js
```javascript
const { test } = require('node:test');
const assert = require('node:assert');
const { MinHeap } = require('../utils/heap');

const numAsc = (a, b) => a - b;

test('insertar y extraer devuelve en orden ascendente', () => {
  const h = new MinHeap(numAsc);
  [5, 3, 8, 1, 9, 2].forEach((n) => h.insertar(n));
  const out = [];
  while (!h.estaVacio()) out.push(h.extraerMinimo());
  assert.deepStrictEqual(out, [1, 2, 3, 5, 8, 9]);
});

test('verMinimo no extrae ni modifica el tamaño', () => {
  const h = new MinHeap(numAsc);
  [5, 3, 8].forEach((n) => h.insertar(n));
  assert.strictEqual(h.verMinimo(), 3);
  assert.strictEqual(h.tamaño, 3);
});

test('extraer de vacío devuelve undefined', () => {
  const h = new MinHeap(numAsc);
  assert.strictEqual(h.extraerMinimo(), undefined);
  assert.strictEqual(h.verMinimo(), undefined);
});

test('desdeArreglo construye en O(n) y la raíz es el mínimo', () => {
  const arr = Array.from({ length: 1000 }, () => Math.floor(Math.random() * 10000));
  const h = MinHeap.desdeArreglo(arr, numAsc);
  assert.strictEqual(h.verMinimo(), Math.min(...arr));
});

test('topK(K=1) devuelve el menor', () => {
  const arr = [{ v: 5 }, { v: 1 }, { v: 9 }, { v: 3 }];
  const r = MinHeap.topK(arr, 1, (a, b) => a.v - b.v);
  assert.strictEqual(r.length, 1);
  assert.strictEqual(r[0].v, 1);
});

test('topK(K=3) devuelve las 3 menores ordenadas', () => {
  const arr = [5, 1, 9, 3, 7, 2].map((v) => ({ v }));
  const r = MinHeap.topK(arr, 3, (a, b) => a.v - b.v);
  assert.deepStrictEqual(r.map((o) => o.v), [1, 2, 3]);
});

test('topK(K >= n) devuelve todo ordenado', () => {
  const arr = [5, 1, 9, 3].map((v) => ({ v }));
  const r = MinHeap.topK(arr, 10, (a, b) => a.v - b.v);
  assert.deepStrictEqual(r.map((o) => o.v), [1, 3, 5, 9]);
});

test('topK con arreglo vacío o K<=0 devuelve []', () => {
  assert.deepStrictEqual(MinHeap.topK([], 3, numAsc), []);
  assert.deepStrictEqual(MinHeap.topK([1, 2], 0, numAsc), []);
  assert.deepStrictEqual(MinHeap.topK([1, 2], -1, numAsc), []);
});
```

## File: backend/src/test/ordenamiento.test.js
```javascript
const { test } = require('node:test');
const assert = require('node:assert');
const { mergeSort, quickSort, crearComparador } = require('../utils/ordenamiento');

const numAsc = (a, b) => a - b;

// ─── MergeSort ───
test('MergeSort: arreglo vacío', () => {
  assert.deepStrictEqual(mergeSort([], numAsc), []);
});

test('MergeSort: un elemento', () => {
  assert.deepStrictEqual(mergeSort([5], numAsc), [5]);
});

test('MergeSort: ya ordenado', () => {
  assert.deepStrictEqual(mergeSort([1, 2, 3, 4], numAsc), [1, 2, 3, 4]);
});

test('MergeSort: invertido', () => {
  assert.deepStrictEqual(mergeSort([4, 3, 2, 1], numAsc), [1, 2, 3, 4]);
});

test('MergeSort: con duplicados', () => {
  assert.deepStrictEqual(mergeSort([3, 1, 3, 2, 1], numAsc), [1, 1, 2, 3, 3]);
});

test('MergeSort: no muta el input', () => {
  const orig = [3, 1, 2];
  const copia = [...orig];
  mergeSort(orig, numAsc);
  assert.deepStrictEqual(orig, copia);
});

test('MergeSort: es estable con empates', () => {
  const arr = [{ k: 1, id: 'A' }, { k: 1, id: 'B' }, { k: 0, id: 'C' }];
  const r = mergeSort(arr, (a, b) => a.k - b.k);
  assert.deepStrictEqual(r.map((o) => o.id), ['C', 'A', 'B']);
});

test('MergeSort: NaN al final en asc', () => {
  const arr = [{ x: 5 }, { x: NaN }, { x: 3 }];
  const r = mergeSort(arr, crearComparador([{ campo: 'x', orden: 'asc' }]));
  assert.ok(Number.isNaN(r[r.length - 1].x));
});

test('MergeSort: NaN al final en desc (#4)', () => {
  const arr = [{ x: 5 }, { x: NaN }, { x: 3 }];
  const r = mergeSort(arr, crearComparador([{ campo: 'x', orden: 'desc' }]));
  assert.ok(Number.isNaN(r[r.length - 1].x), `NaN debe ir al final en desc, salió: ${JSON.stringify(r)}`);
  assert.strictEqual(r[0].x, 5);
  assert.strictEqual(r[1].x, 3);
});

// ─── QuickSort ───
test('QuickSort: ya ordenado (sin stack overflow)', () => {
  const arr = Array.from({ length: 1000 }, (_, i) => i);
  assert.deepStrictEqual(quickSort(arr, numAsc), arr);
});

test('QuickSort: todos iguales', () => {
  assert.deepStrictEqual(quickSort([7, 7, 7, 7], numAsc), [7, 7, 7, 7]);
});

test('QuickSort: coincide con Array.sort en 100 arreglos aleatorios', () => {
  for (let i = 0; i < 100; i++) {
    const arr = Array.from({ length: 50 }, () => Math.floor(Math.random() * 1000));
    const esperado = [...arr].sort(numAsc);
    assert.deepStrictEqual(quickSort(arr, numAsc), esperado);
  }
});

// ─── Comparador multicriterio ───
test('Comparador: campo anidado (clima.temperatura)', () => {
  const arr = [{ clima: { t: 30 } }, { clima: { t: 10 } }, { clima: { t: 20 } }];
  const r = mergeSort(arr, crearComparador([{ campo: 'clima.t', orden: 'asc' }]));
  assert.deepStrictEqual(r.map((o) => o.clima.t), [10, 20, 30]);
});

test('Comparador: valores vacíos al final en asc y desc', () => {
  const arr = [{ x: 5 }, { x: null }, { x: 3 }];
  const asc = mergeSort(arr, crearComparador([{ campo: 'x', orden: 'asc' }]));
  const desc = mergeSort(arr, crearComparador([{ campo: 'x', orden: 'desc' }]));
  assert.strictEqual(asc[asc.length - 1].x, null);
  assert.strictEqual(desc[desc.length - 1].x, null);
});

test('Comparador: texto con Intl.Collator (es)', () => {
  const arr = [{ n: 'José' }, { n: 'Ana' }, { n: 'Zoe' }];
  const r = mergeSort(arr, crearComparador([{ campo: 'n', orden: 'asc' }]));
  assert.deepStrictEqual(r.map((o) => o.n), ['Ana', 'José', 'Zoe']);
});

test('Comparador: desempate por segundo criterio', () => {
  const arr = [
    { a: 1, b: 3 },
    { a: 1, b: 1 },
    { a: 0, b: 9 },
  ];
  const r = mergeSort(arr, crearComparador([
    { campo: 'a', orden: 'asc' },
    { campo: 'b', orden: 'asc' },
  ]));
  assert.deepStrictEqual(r.map((o) => [o.a, o.b]), [[0, 9], [1, 1], [1, 3]]);
});

test('Comparador: lanza error si no hay criterios', () => {
  assert.throws(() => crearComparador([]), /al menos un criterio/);
});
```

## File: backend/src/utils/heap.js
```javascript
/**
 * Min-Heap binario (montículo mínimo).
 *
 * Estructura de datos en forma de árbol binario completo, almacenada en un
 * arreglo: el hijo izquierdo de i está en 2i+1, el derecho en 2i+2, el padre
 * en (i-1)>>1. Propiedad de min-heap: el padre siempre es ≤ que sus hijos,
 * por lo que el mínimo está siempre en la raíz (índice 0).
 *
 * Operaciones:
 *   insertar        O(log n)
 *   extraerMinimo   O(log n)
 *   verMinimo       O(1)
 *   construirHeap   O(n)   (heapify bottom-up)
 *   topK            O(n log K)  (útil para "las mejores K rutas")
 */

class MinHeap {
  constructor(comparar) {
    if (typeof comparar !== 'function') throw new Error('MinHeap requiere una función comparar');
    this.comparar = comparar; // (a,b) => neg si a<b, 0, pos si a>b
    this.datos = [];
  }

  get tamaño() { return this.datos.length; }

  estaVacio() { return this.datos.length === 0; }

  verMinimo() { return this.datos.length === 0 ? undefined : this.datos[0]; }

  insertar(valor) {
    this.datos.push(valor);
    this._subir(this.datos.length - 1);
    return this;
  }

  extraerMinimo() {
    if (this.datos.length === 0) return undefined;
    const min = this.datos[0];
    const ultimo = this.datos.pop();
    if (this.datos.length > 0) {
      this.datos[0] = ultimo;
      this._bajar(0);
    }
    return min;
  }

  /** Construye el heap en O(n) a partir de un arreglo (bottom-up heapify). */
  static desdeArreglo(arreglo, comparar) {
    const h = new MinHeap(comparar);
    h.datos = arreglo.slice();
    for (let i = (h.datos.length >> 1) - 1; i >= 0; i--) h._bajar(i);
    return h;
  }

  /**
   * Devuelve los K menores elementos SIN ordenar todo el arreglo.
   * Complejidad: O(n log K), mejor que O(n log n) cuando K << n.
   */
  static topK(arreglo, k, comparar) {
    if (k <= 0) return [];
    const maxHeap = new MinHeap((a, b) => -comparar(a, b)); // max-heap auxiliar
    for (const elemento of arreglo) {
      if (maxHeap.tamaño < k) maxHeap.insertar(elemento);
      else if (comparar(elemento, maxHeap.verMinimo()) < 0) {
        maxHeap.extraerMinimo();
        maxHeap.insertar(elemento);
      }
    }
    // Vaciar el max-heap (devuelve de mayor a menor) y revertir
    const resultado = [];
    while (!maxHeap.estaVacio()) resultado.push(maxHeap.extraerMinimo());
    return resultado.reverse();
  }

  _subir(i) {
    while (i > 0) {
      const padre = (i - 1) >> 1;
      if (this.comparar(this.datos[i], this.datos[padre]) >= 0) break;
      [this.datos[i], this.datos[padre]] = [this.datos[padre], this.datos[i]];
      i = padre;
    }
  }

  _bajar(i) {
    const n = this.datos.length;
    for (;;) {
      let menor = i;
      const izq = 2 * i + 1;
      const der = 2 * i + 2;
      if (izq < n && this.comparar(this.datos[izq], this.datos[menor]) < 0) menor = izq;
      if (der < n && this.comparar(this.datos[der], this.datos[menor]) < 0) menor = der;
      if (menor === i) break;
      [this.datos[i], this.datos[menor]] = [this.datos[menor], this.datos[i]];
      i = menor;
    }
  }
}

module.exports = { MinHeap };
```

## File: backend/src/config/db.js
```javascript
const mongoose = require('mongoose');

async function connectDB() {
  const uri = process.env.MONGO_URI;
  if (!uri) {
    console.warn('⚠️  MONGO_URI no está definida. La API funcionará sin persistencia.');
    return;
  }
  try {
    await mongoose.connect(uri);
    console.log('✅ Conectado a MongoDB');
  } catch (error) {
    console.error('❌ Error conectando a MongoDB:', error.message);
    console.warn('La API seguirá funcionando, pero el registro de fincas/plantas/histórico no persistirá.');
  }
}

module.exports = connectDB;
```

## File: backend/src/data/productos/cafe.js
```javascript
module.exports = {
    //datos para el frontend (a futuro)
  slug: 'cafe',
  nombre: 'Pulpa de café',
  icono: '☕',
  descripcion: 'Residuo orgánico del despulpado del grano; fermenta pocas horas después de generarse.',

  vidaUtilHoras: 3, // horizonte critico en transito (antes: duracionMin / 180, en deteriorationRisk)
  densidadKgM3: 400, 
  toleranciaFisica: 0, // antes: carreteraNorm = factorRiesgoCarretera (sin tolerancia)

  sensibilidadTermica: { optimaMax: 15, criticaMax: 35 }, // antes: (T - 15) / 20, en deteriorationRisk
  sensibilidadHumedad: { optimaMax: 40, criticaMax: 100 }, // antes: (H - 40) / 60 en deterioration
  lluviaCriticaMmH: 15, // antes: lluviaMm / 15, de deteriorationRisk
  variacionAltitudCriticaM: 800, // antes: variacionAltitud / 800, de deteriorationRisk

    //pesos provenientes de deteriorationRisk, se usa para saber que tan mal llegaria el producto en x ruta
  pesosDeterioro: {
    tiempo: 0.3,
    temperatura: 0.2,
    humedad: 0.15,
    lluvia: 0.15,
    carretera: 0.1,
    altitud: 0.1,
  },
  // pesosOptimizacion: usaria los pesos globales de optimizacionService.js

  requiereRefrigeracion: false,

};
```

## File: backend/src/models/Finca.js
```javascript
const mongoose = require('mongoose');

const FincaSchema = new mongoose.Schema(
  {
    nombre: { type: String, required: true, trim: true },
    propietario: { type: String, trim: true },
    ubicacion: {
      lat: { type: Number, required: true },
      lng: { type: Number, required: true },
      direccion: { type: String, trim: true },
    },
    altitud: { type: Number }, // msnm, se puede calcular con Google Elevation API
    produccionEstimadaKgDia: { type: Number, default: 0 },
    contacto: { type: String, trim: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Finca', FincaSchema);
```

## File: backend/src/models/Planta.js
```javascript
const mongoose = require('mongoose');

const PlantaSchema = new mongoose.Schema(
  {
    nombre: { type: String, required: true, trim: true },
    ubicacion: {
      lat: { type: Number, required: true },
      lng: { type: Number, required: true },
      direccion: { type: String, trim: true },
    },
    altitud: { type: Number },
    capacidadRecepcionKgDia: { type: Number, default: 0 },
    contacto: { type: String, trim: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Planta', PlantaSchema);
```

## File: backend/src/models/ProductoAgricola.js
```javascript
const mongoose = require('mongoose');
const { Schema } = mongoose;

const FINITO = { validator: Number.isFinite, message: 'debe ser un número finito (rechaza Infinity y NaN)' };

const BandaToleranciaSchema = new Schema(
  {
    optimaMin: { type: Number, validate: FINITO },
    optimaMax: { type: Number, required: true, validate: FINITO },
    criticaMin: { type: Number, validate: FINITO },
    criticaMax: { type: Number, required: true, validate: FINITO },
  },
  { _id: false }
);

// valida que la cota critica sea mayor que la optima
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
    version: { type: Number, default: 1, min: 1, validate: FINITO }, // súbela al editar parámetros (trazabilidad)

    vidaUtilHoras: { type: Number, required: true, min: 0.1, validate: FINITO },

    densidadKgM3: { type: Number, required: true, min: 1, validate: FINITO },

    toleranciaFisica: { type: Number, required: true, min: 0, max: 0.95, validate: FINITO },

    // ---- Tolerancias ambientales ----
    sensibilidadTermica: { type: BandaToleranciaSchema, required: true }, // °C
    sensibilidadHumedad: { type: BandaToleranciaSchema, required: true }, // % HR
    lluviaCriticaMmH: { type: Number, required: true, min: 0.1, validate: FINITO }, // mm/h con riesgo máximo
    variacionAltitudCriticaM: { type: Number, required: true, min: 1, validate: FINITO }, // m de desnivel con riesgo máximo

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
```

## File: backend/src/routes/fincas.routes.js
```javascript
const express = require('express');
const router = express.Router();
const Finca = require('../models/Finca');
const { obtenerAltitudes } = require('../services/elevationService');

// Listar todas las fincas
router.get('/', async (req, res, next) => {
  try {
    const fincas = await Finca.find().sort({ createdAt: -1 });
    res.json(fincas);
  } catch (error) {
    next(error);
  }
});

// Obtener una finca por ID
router.get('/:id', async (req, res, next) => {
  try {
    const finca = await Finca.findById(req.params.id);
    if (!finca) return res.status(404).json({ error: true, mensaje: 'Finca no encontrada' });
    res.json(finca);
  } catch (error) {
    next(error);
  }
});

// Registrar una nueva finca
router.post('/', async (req, res, next) => {
  try {
    const { nombre, propietario, ubicacion, produccionEstimadaKgDia, contacto } = req.body;

    if (!nombre || !ubicacion?.lat || !ubicacion?.lng) {
      return res.status(400).json({ error: true, mensaje: 'nombre y ubicacion (lat, lng) son obligatorios' });
    }

    // Calcula automáticamente la altitud de la finca si no se especifica
    let altitud = req.body.altitud;
    if (altitud === undefined) {
      const [alt] = await obtenerAltitudes([{ lat: ubicacion.lat, lng: ubicacion.lng }]);
      altitud = alt;
    }

    const finca = await Finca.create({
      nombre,
      propietario,
      ubicacion,
      altitud,
      produccionEstimadaKgDia,
      contacto,
    });

    res.status(201).json(finca);
  } catch (error) {
    next(error);
  }
});

// Actualizar una finca
router.put('/:id', async (req, res, next) => {
  try {
    const finca = await Finca.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!finca) return res.status(404).json({ error: true, mensaje: 'Finca no encontrada' });
    res.json(finca);
  } catch (error) {
    next(error);
  }
});

// Eliminar una finca
router.delete('/:id', async (req, res, next) => {
  try {
    const finca = await Finca.findByIdAndDelete(req.params.id);
    if (!finca) return res.status(404).json({ error: true, mensaje: 'Finca no encontrada' });
    res.json({ mensaje: 'Finca eliminada correctamente' });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
```

## File: backend/src/routes/ordenamiento.routes.js
```javascript
const mongoose = require('mongoose');
const express = require('express');
const { CAMPOS, ordenarRegistros } = require('../services/ordenamientoService');
const { parsearCriterios } = require('../utils/ordenamiento');

const router = express.Router();

router.get('/campos', (req, res) => res.json(CAMPOS));

router.get('/:conjunto', async (req, res) => {
  const { conjunto } = req.params;
  const algoritmo = String(req.query.algoritmo || 'comparar').toLowerCase();
  const limite = Math.max(0, Math.min(Number(req.query.limite ?? 50) || 0, 1000));

  if (!Object.hasOwn(CAMPOS, conjunto)) {
    return res.status(400).json({ error: true, mensaje: `Conjunto no válido. Use: ${Object.keys(CAMPOS).join(', ')}` });
  }
  if (!['merge', 'quick', 'comparar'].includes(algoritmo)) {
    return res.status(400).json({ error: true, mensaje: 'algoritmo debe ser merge, quick o comparar' });
  }

  const criterios = parsearCriterios(req.query.criterios);
  const invalidos = criterios.filter((c) => !CAMPOS[conjunto].includes(c.campo));
  if (criterios.length === 0 || invalidos.length > 0) {
    return res.status(400).json({
      error: true,
      mensaje: criterios.length === 0
        ? 'Indique criterios, p. ej. ?criterios=riesgoDeterioro:asc,distanciaKm:desc'
        : `Campos no válidos para "${conjunto}": ${invalidos.map((c) => c.campo).join(', ')}`,
      camposDisponibles: CAMPOS[conjunto],
    });
  }
  if (mongoose.connection.readyState !== 1) {
    return res.status(503).json({
      error: true,
      mensaje: 'MongoDB no disponible. No se pueden ordenar registros sin base de datos.',
    });
  }
  try {
    const { total, metricas, datos } = await ordenarRegistros(conjunto, criterios, algoritmo);
    res.json({ conjunto, criterios: metricas[0].criterios, total, metricas, datos: datos.slice(0, limite) });
  } catch (error) {
    res.status(503).json({
      error: true,
      mensaje: 'No se pudo leer la base de datos. Verifique que MongoDB esté disponible.',
      detalle: error.message,
    });
  }
});

module.exports = router;
```

## File: backend/src/routes/plantas.routes.js
```javascript
const express = require('express');
const router = express.Router();
const Planta = require('../models/Planta');
const { obtenerAltitudes } = require('../services/elevationService');

// Listar todas las plantas de procesamiento
router.get('/', async (req, res, next) => {
  try {
    const plantas = await Planta.find().sort({ createdAt: -1 });
    res.json(plantas);
  } catch (error) {
    next(error);
  }
});

// Obtener una planta por ID
router.get('/:id', async (req, res, next) => {
  try {
    const planta = await Planta.findById(req.params.id);
    if (!planta) return res.status(404).json({ error: true, mensaje: 'Planta no encontrada' });
    res.json(planta);
  } catch (error) {
    next(error);
  }
});

// Registrar una nueva planta de procesamiento
router.post('/', async (req, res, next) => {
  try {
    const { nombre, ubicacion, capacidadRecepcionKgDia, contacto } = req.body;

    if (!nombre || !ubicacion?.lat || !ubicacion?.lng) {
      return res.status(400).json({ error: true, mensaje: 'nombre y ubicacion (lat, lng) son obligatorios' });
    }

    let altitud = req.body.altitud;
    if (altitud === undefined) {
      const [alt] = await obtenerAltitudes([{ lat: ubicacion.lat, lng: ubicacion.lng }]);
      altitud = alt;
    }

    const planta = await Planta.create({
      nombre,
      ubicacion,
      altitud,
      capacidadRecepcionKgDia,
      contacto,
    });

    res.status(201).json(planta);
  } catch (error) {
    next(error);
  }
});

// Actualizar una planta
router.put('/:id', async (req, res, next) => {
  try {
    const planta = await Planta.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!planta) return res.status(404).json({ error: true, mensaje: 'Planta no encontrada' });
    res.json(planta);
  } catch (error) {
    next(error);
  }
});

// Eliminar una planta
router.delete('/:id', async (req, res, next) => {
  try {
    const planta = await Planta.findByIdAndDelete(req.params.id);
    if (!planta) return res.status(404).json({ error: true, mensaje: 'Planta no encontrada' });
    res.json({ mensaje: 'Planta eliminada correctamente' });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
```

## File: backend/src/services/elevationService.js
```javascript
const axios = require('axios');

/**
 * Open-Elevation es una API de elevación gratuita y de código abierto (sin API key).
 * https://open-elevation.com/
 * Nota: la instancia pública puede ser lenta o tener límites de uso; para producción
 * se recomienda auto-hospedar (Docker: https://github.com/Jorl17/open-elevation).
 */
const OPEN_ELEVATION_URL =
  process.env.OPEN_ELEVATION_URL || 'https://api.open-elevation.com/api/v1/lookup';

/**
 * Consulta la altitud (msnm) de una lista de puntos.
 * @param {Array<{lat:number, lng:number}>} puntos
 * @returns {Promise<number[]>} altitudes en el mismo orden de los puntos
 */
async function obtenerAltitudes(puntos) {
  if (!puntos || puntos.length === 0) return [];

  try {
    const { data } = await axios.post(
      OPEN_ELEVATION_URL,
      {
        locations: puntos.map((p) => ({ latitude: p.lat, longitude: p.lng })),
      },
      { headers: { 'Content-Type': 'application/json' }, timeout: 8000 }
    );

    if (!data.results || data.results.length === 0) {
      return simularAltitudes(puntos);
    }

    return data.results.map((r) => r.elevation);
  } catch (error) {
    console.error('Error consultando Open-Elevation:', error.message);
    return simularAltitudes(puntos);
  }
}

/** Altitudes simuladas (zona cafetera típica: 1000-1800 msnm) para cuando la API no responde */
function simularAltitudes(puntos) {
  return puntos.map(() => 1000 + Math.round(Math.random() * 800));
}

module.exports = { obtenerAltitudes };
```

## File: backend/src/services/ordenamientoService.js
```javascript
/**
 * Ordena los registros guardados en la base de datos (fincas, plantas e historial
 * de rutas evaluadas) con MergeSort o QuickSort y varios criterios a la vez.
 */
const Finca = require('../models/Finca');
const Planta = require('../models/Planta');
const RutaHistorial = require('../models/RutaHistorial');
const {
  ordenarConMetricas, registrarMetricas, crearComparador, parsearCriterios, estaOrdenado,
} = require('../utils/ordenamiento');

/** Campos por los que se puede ordenar cada conjunto de registros */
const CAMPOS = {
  fincas: ['nombre', 'propietario', 'altitud', 'produccionEstimadaKgDia', 'ubicacion.lat', 'ubicacion.lng', 'createdAt'],
  plantas: ['nombre', 'altitud', 'capacidadRecepcionKgDia', 'ubicacion.lat', 'ubicacion.lng', 'createdAt'],
  historial: ['fecha', 'finca', 'planta', 'resumen', 'distanciaKm', 'duracionMin', 'altitudPromedio', 'estadoCarretera',
    'clima.temperatura', 'clima.humedad', 'clima.lluviaMm', 'emisionesCO2Kg', 'riesgoDeterioro', 'puntajeEcologico'],
};

/** Lee de MongoDB los registros del conjunto pedido */
async function cargarRegistros(conjunto) {
  if (conjunto === 'fincas') return Finca.find().lean();
  if (conjunto === 'plantas') return Planta.find().lean();
  if (conjunto === 'historial') {
    // Cada evaluación guarda de 1 a 3 rutas: cada ruta se convierte en un registro
    const evaluaciones = await RutaHistorial.find().populate('finca', 'nombre').populate('planta', 'nombre').lean();
    return evaluaciones.flatMap((evaluacion) =>
      (evaluacion.rutasEvaluadas || []).map((ruta) => ({
        ...ruta,
        fecha: evaluacion.createdAt,
        finca: evaluacion.finca?.nombre ?? 'Coordenadas manuales',
        planta: evaluacion.planta?.nombre ?? 'Coordenadas manuales',
      }))
    );
  }
  throw new Error(`Conjunto no válido: ${conjunto}`);
}

/**
 * Ordena un conjunto de registros de la base de datos.
 * @param {'fincas'|'plantas'|'historial'} conjunto
 * @param {string} criterios  p. ej. "riesgoDeterioro:asc,emisionesCO2Kg:asc"
 * @param {'merge'|'quick'|'comparar'} algoritmo  "comparar" ejecuta los dos
 * @returns {{ total, metricas: Array, datos: Array }}
 */
async function ordenarRegistros(conjunto, criterios, algoritmo = 'comparar') {
  const registros = await cargarRegistros(conjunto);
  const lista = parsearCriterios(criterios);
  const comparar = crearComparador(lista);
  const algoritmos = algoritmo === 'comparar' ? ['merge', 'quick'] : [algoritmo];

  const metricas = [];
  let datos = null;
  for (const alg of algoritmos) {
    const resultado = ordenarConMetricas(alg, registros, lista);
    resultado.metricas.verificado = estaOrdenado(resultado.datos, comparar);
    registrarMetricas(conjunto, resultado.metricas);
    metricas.push(resultado.metricas);
    if (!datos) datos = resultado.datos;
  }
  return { total: registros.length, metricas, datos };
}

module.exports = { CAMPOS, cargarRegistros, ordenarRegistros };
```

## File: backend/src/services/osrmService.js
```javascript
const axios = require('axios');

/**
 * OSRM (Open Source Routing Machine) es un motor de ruteo open-source.
 * Usamos el servidor demo público por defecto (sin necesidad de API key), pero
 * se recomienda auto-hospedar una instancia propia para producción, ya que el
 * servidor demo tiene límites de uso y no ofrece garantías de disponibilidad.
 * Ver: https://project-osrm.org/  |  Docker: https://hub.docker.com/r/osrm/osrm-backend
 */
const OSRM_BASE_URL = process.env.OSRM_BASE_URL || 'https://router.project-osrm.org';

/**
 * Obtiene varias rutas alternativas entre un origen y un destino usando OSRM.
 * @param {{lat:number,lng:number}} origen
 * @param {{lat:number,lng:number}} destino
 * @returns {Promise<Array>} lista de rutas normalizadas
 */
async function obtenerRutasAlternativas(origen, destino) {
  const coords = `${origen.lng},${origen.lat};${destino.lng},${destino.lat}`;
  const url = `${OSRM_BASE_URL}/route/v1/driving/${coords}`;

  try {
    const { data } = await axios.get(url, {
      params: {
        alternatives: true,
        overview: 'full',
        geometries: 'polyline', // mismo formato de codificación que usa Google (precisión 5)
        steps: true,
      },
      timeout: 10000,
    });

    if (data.code !== 'Ok' || !data.routes || data.routes.length === 0) {
      console.warn('OSRM respondió sin rutas válidas, usando datos simulados:', data.code);
      return simularRutas(origen, destino);
    }

    return data.routes.map((route, index) => {
      const coordenadas = decodificarPolyline(route.geometry);
      return {
        id: `ruta_${index + 1}`,
        resumen: nombrarRuta(route, index),
        distanciaKm: route.distance / 1000,
        duracionMin: route.duration / 60,
        polyline: route.geometry,
        puntosMuestra: extraerPuntosMuestra(coordenadas),
        // Nombres de vías reportados por OSM a lo largo de la ruta (para referencia)
        viasPrincipales: extraerNombresVias(route),
      };
    });
  } catch (error) {
    console.error('Error consultando OSRM:', error.message);
    return simularRutas(origen, destino);
  }
}

/** Genera un nombre descriptivo de la ruta a partir de los nombres de calle más frecuentes */
function nombrarRuta(route, index) {
  const nombres = extraerNombresVias(route);
  if (nombres.length > 0) {
    return `Ruta ${index + 1} (vía ${nombres[0]})`;
  }
  return `Ruta alternativa ${index + 1}`;
}

/** Extrae los nombres de vía (steps[].name) más largos/relevantes de la ruta OSRM */
function extraerNombresVias(route) {
  const nombres = route.legs
    .flatMap((leg) => leg.steps.map((s) => s.name))
    .filter((n) => n && n.trim().length > 0);
  // Deduplicar manteniendo orden
  return [...new Set(nombres)].slice(0, 3);
}

/** Toma 3 puntos representativos (inicio, medio, fin) de la ruta decodificada para muestrear clima/altitud */
function extraerPuntosMuestra(coordenadas) {
  if (!coordenadas || coordenadas.length === 0) return [];
  const inicio = coordenadas[0];
  const fin = coordenadas[coordenadas.length - 1];
  const medio = coordenadas[Math.floor(coordenadas.length / 2)];
  return [inicio, medio, fin];
}

/**
 * Decodifica una polyline codificada (formato estándar, precisión 5 — el mismo que usa OSRM y Google).
 * Referencia: https://developers.google.com/maps/documentation/utilities/polylinealgorithm
 */
function decodificarPolyline(encoded) {
  if (!encoded) return [];
  let index = 0;
  let lat = 0;
  let lng = 0;
  const puntos = [];

  while (index < encoded.length) {
    let b;
    let shift = 0;
    let result = 0;
    do {
      b = encoded.charCodeAt(index++) - 63;
      result |= (b & 0x1f) << shift;
      shift += 5;
    } while (b >= 0x20);
    const dlat = result & 1 ? ~(result >> 1) : result >> 1;
    lat += dlat;

    shift = 0;
    result = 0;
    do {
      b = encoded.charCodeAt(index++) - 63;
      result |= (b & 0x1f) << shift;
      shift += 5;
    } while (b >= 0x20);
    const dlng = result & 1 ? ~(result >> 1) : result >> 1;
    lng += dlng;

    puntos.push({ lat: lat / 1e5, lng: lng / 1e5 });
  }
  return puntos;
}

/** Genera rutas simuladas cuando OSRM no está disponible (modo demo/offline) */
function simularRutas(origen, destino) {
  const distanciaBase = distanciaHaversineKm(origen, destino);
  const rutas = [
    { nombre: 'Ruta principal (vía nacional)', factorDist: 1.15, factorVel: 65 },
    { nombre: 'Ruta corta (vía veredal)', factorDist: 0.95, factorVel: 28 },
    { nombre: 'Ruta alterna (mayor rodeo)', factorDist: 1.35, factorVel: 50 },
  ];

  return rutas.map((r, index) => {
    const distanciaKm = Number((distanciaBase * r.factorDist).toFixed(2));
    const duracionMin = Number(((distanciaKm / r.factorVel) * 60).toFixed(1));
    const puntosMuestra = extraerPuntosMuestra([
      origen,
      { lat: (origen.lat + destino.lat) / 2, lng: (origen.lng + destino.lng) / 2 },
      destino,
    ]);
    return {
      id: `ruta_${index + 1}`,
      resumen: r.nombre,
      distanciaKm,
      duracionMin,
      polyline: null,
      puntosMuestra,
      viasPrincipales: [],
    };
  });
}

function distanciaHaversineKm(a, b) {
  const R = 6371;
  const dLat = ((b.lat - a.lat) * Math.PI) / 180;
  const dLng = ((b.lng - a.lng) * Math.PI) / 180;
  const lat1 = (a.lat * Math.PI) / 180;
  const lat2 = (b.lat * Math.PI) / 180;
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(h), Math.sqrt(1 - h));
}

module.exports = { obtenerRutasAlternativas, distanciaHaversineKm };
```

## File: backend/src/services/productoService.js
```javascript
const SLUG_DEFAULT = 'cafe';

// Un Map evita que slugs como "constructor" o "__proto__" resuelvan a propiedades de Object.prototype.
const catalogo = cargarCatalogo();
if (!catalogo.has(SLUG_DEFAULT)) {
  throw new Error(`productoService: falta el perfil por defecto "${SLUG_DEFAULT}" en data/productos/`);
}

function errorSlug(mensaje) {
  const err = new Error(mensaje);
  err.status = 400;
  return err;
}

/**
 * @param {string|null|undefined} slug
 * @returns {Object} perfil validado y congelado
 * @throws {Error} con status 400 si el slug no existe o no es texto
 */
function cargarPerfil(slug) {
  if (slug != null && typeof slug !== 'string') {
    throw errorSlug('productoSlug debe ser un texto');
  }
  const limpio = (slug ?? '').trim().toLowerCase();
  const clave = limpio === '' ? SLUG_DEFAULT : limpio;

  const perfil = catalogo.get(clave);
  if (!perfil) {
    throw errorSlug(`productoSlug "${clave}" no existe. Disponibles: ${[...catalogo.keys()].join(', ')}`);
  }
  return perfil;
}

/** Metadatos para poblar el <select> del frontend (GET /api/productos). */
function listarProductos() {
  return [...catalogo.values()]
    .map(({ slug, nombre, icono, descripcion }) => ({ slug, nombre, icono, descripcion }))
    .sort((a, b) => a.nombre.localeCompare(b.nombre, 'es'));
}

module.exports = { cargarPerfil, listarProductos };
```

## File: backend/src/services/roadConditionService.js
```javascript
/**
 * Servicio de estado de carreteras.
 *
 * No existe una API pública gratuita estándar para "estado físico de la vía"
 * (pavimentada/destapada, huecos, derrumbes) en toda Latinoamérica. Este servicio
 * usa una heurística basada en la VELOCIDAD PROMEDIO real reportada por OSRM
 * (distancia / duración): vías en buen estado (pavimentadas, nacionales) permiten
 * mayor velocidad promedio; vías destapadas, rurales o montañosas obligan a
 * velocidades bajas. Es una heurística razonable porque OSRM ya modela límites de
 * velocidad y tipo de vía de OpenStreetMap al calcular la duración del trayecto.
 *
 * Para una integración más precisa en producción, esto puede sustituirse o
 * complementarse con datos reales de superficie vial, por ejemplo consultando el
 * tag `surface` de OpenStreetMap vía la Overpass API, reportes de INVÍAS, o un
 * sistema propio de reportes viales alimentado por los conductores.
 */

const UMBRAL_BUENO_KMH = 55; // vías pavimentadas/nacionales normalmente permiten esta velocidad o más
const UMBRAL_REGULAR_KMH = 32; // vías secundarias/mixtas

/**
 * Evalúa el estado de la carretera a partir de la velocidad promedio de la ruta.
 * @param {{distanciaKm:number, duracionMin:number}} ruta
 * Retorna: 'bueno' | 'regular' | 'malo' junto con un factor de riesgo 0-1.
 */
function evaluarEstadoCarretera(ruta) {
  const horas = ruta.duracionMin / 60;
  const velocidadPromedioKmh = horas > 0 ? ruta.distanciaKm / horas : 0;

  if (velocidadPromedioKmh >= UMBRAL_BUENO_KMH) {
    return { estado: 'bueno', factorRiesgo: 0.15, velocidadPromedioKmh: round1(velocidadPromedioKmh) };
  }
  if (velocidadPromedioKmh >= UMBRAL_REGULAR_KMH) {
    return { estado: 'regular', factorRiesgo: 0.5, velocidadPromedioKmh: round1(velocidadPromedioKmh) };
  }
  return { estado: 'malo', factorRiesgo: 0.85, velocidadPromedioKmh: round1(velocidadPromedioKmh) };
}

function round1(n) {
  return Number(n.toFixed(1));
}

module.exports = { evaluarEstadoCarretera };
```

## File: backend/src/services/weatherService.js
```javascript
const axios = require('axios');

const OPENWEATHER_API_KEY = process.env.OPENWEATHER_API_KEY;
const WEATHER_URL = 'https://api.openweathermap.org/data/2.5/weather';

/**
 * Consulta el clima actual en un punto geográfico.
 * @param {{lat:number, lng:number}} punto
 */
async function obtenerClima(punto) {
  if (!OPENWEATHER_API_KEY) {
    return simularClima();
  }

  try {
    const { data } = await axios.get(WEATHER_URL, {
      params: {
        lat: punto.lat,
        lon: punto.lng,
        appid: OPENWEATHER_API_KEY,
        units: 'metric',
        lang: 'es',
      },
    });

    return {
      descripcion: data.weather?.[0]?.description || 'No disponible',
      temperatura: data.main?.temp ?? null,
      humedad: data.main?.humidity ?? null,
      lluviaMm: data.rain?.['1h'] ?? 0,
      viento: data.wind?.speed ?? null,
    };
  } catch (error) {
    console.error('Error consultando OpenWeatherMap:', error.message);
    return simularClima();
  }
}

/**
 * Obtiene el clima promedio a lo largo de varios puntos de una ruta.
 */
async function obtenerClimaPromedioRuta(puntos) {
  const resultados = await Promise.all(puntos.map((p) => obtenerClima(p)));
  const validos = resultados.filter((r) => r.temperatura !== null);
  if (validos.length === 0) return simularClima();

  const promedio = (campo) =>
    validos.reduce((acc, r) => acc + (r[campo] || 0), 0) / validos.length;

  return {
    descripcion: validos[Math.floor(validos.length / 2)].descripcion,
    temperatura: Number(promedio('temperatura').toFixed(1)),
    humedad: Number(promedio('humedad').toFixed(1)),
    lluviaMm: Number(promedio('lluviaMm').toFixed(2)),
    viento: Number(promedio('viento').toFixed(1)),
  };
}

/** Clima simulado para modo demo sin API key */
function simularClima() {
  const opciones = [
    { descripcion: 'cielo claro', temperatura: 24, humedad: 55, lluviaMm: 0, viento: 2 },
    { descripcion: 'nubes dispersas', temperatura: 21, humedad: 70, lluviaMm: 0.5, viento: 3 },
    { descripcion: 'lluvia ligera', temperatura: 19, humedad: 85, lluviaMm: 3.2, viento: 4 },
    { descripcion: 'tormenta', temperatura: 18, humedad: 92, lluviaMm: 12, viento: 6 },
  ];
  return opciones[Math.floor(Math.random() * opciones.length)];
}

module.exports = { obtenerClima, obtenerClimaPromedioRuta };
```

## File: backend/src/test/fixtures/unidad1.js
```javascript
/**
 * Implementaciones ORIGINALES de la Unidad 1, congeladas. NO TOCAR.
 * Copia literal de deteriorationRisk.js y co2Calculator.js previos al refactor.
 * Fuente de verdad: `git show <commit-unidad-1>:backend/src/utils/...`
 */
function calcularRiesgoDeterioroOriginal({ duracionMin, temperatura, humedad, lluviaMm, factorRiesgoCarretera, variacionAltitud }) {
  const clamp = (v, min, max) => Math.min(Math.max(v, min), max);
  const tiempoNorm = clamp(duracionMin / 180, 0, 1);
  const temperaturaNorm = clamp((temperatura - 15) / 20, 0, 1);
  const humedadNorm = clamp((humedad - 40) / 60, 0, 1);
  const lluviaNorm = clamp(lluviaMm / 15, 0, 1);
  const carreteraNorm = clamp(factorRiesgoCarretera, 0, 1);
  const altitudNorm = clamp(variacionAltitud / 800, 0, 1);
  const pesos = { tiempo: 0.3, temperatura: 0.2, humedad: 0.15, lluvia: 0.15, carretera: 0.1, altitud: 0.1 };
  const riesgo =
    tiempoNorm * pesos.tiempo + temperaturaNorm * pesos.temperatura + humedadNorm * pesos.humedad +
    lluviaNorm * pesos.lluvia + carreteraNorm * pesos.carretera + altitudNorm * pesos.altitud;
  return Number((riesgo * 100).toFixed(1));
}

function calcularEmisionesCO2Original({ distanciaKm, factorRiesgoCarretera = 0.3, factorBase }) {
  const FACTOR_BASE = factorBase || Number(process.env.CO2_EMISSION_FACTOR_KG_KM) || 0.9;
  const factorAjustado = FACTOR_BASE * (1 + factorRiesgoCarretera * 0.4);
  return Number((distanciaKm * factorAjustado).toFixed(2));
}

/** PRNG determinista (mulberry32): el test falla igual en todas las máquinas y en CI. */
function prng(seed) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

module.exports = { calcularRiesgoDeterioroOriginal, calcularEmisionesCO2Original, prng };
```

## File: backend/src/test/co2Calculator.test.js
```javascript
/**
 * Test del calculador de CO2: golden master de Unidad 1 + semántica de refrigeración.
 * Ejecutar:  node --test src/test/
 */
const { test, beforeEach, afterEach } = require('node:test');
const assert = require('node:assert');

const { calcularEmisionesCO2 } = require('../utils/co2Calculator');
const { calcularEmisionesCO2Original, prng } = require('./fixtures/unidad1');

const ENV_KEYS = ['CO2_REFRIGERACION_KG_H', 'CO2_EMISSION_FACTOR_KG_KM'];
let envGuardado;
beforeEach(() => { envGuardado = Object.fromEntries(ENV_KEYS.map((k) => [k, process.env[k]])); ENV_KEYS.forEach((k) => delete process.env[k]); });
afterEach(() => { ENV_KEYS.forEach((k) => (envGuardado[k] === undefined ? delete process.env[k] : (process.env[k] = envGuardado[k]))); });

test('paridad con Unidad 1 sin refrigeración (50.000 casos, seed fija)', () => {
  const rnd = prng(42);
  for (let i = 0; i < 50000; i++) {
    const args = { distanciaKm: rnd() * 800, factorRiesgoCarretera: rnd() };
    assert.strictEqual(calcularEmisionesCO2(args), calcularEmisionesCO2Original(args));
  }
  // defaults de la Unidad 1 (factorRiesgoCarretera = 0.3, base 0.9)
  assert.strictEqual(calcularEmisionesCO2({ distanciaKm: 100 }), calcularEmisionesCO2Original({ distanciaKm: 100 }));
  assert.strictEqual(calcularEmisionesCO2({ distanciaKm: 100, factorBase: 1.2 }), calcularEmisionesCO2Original({ distanciaKm: 100, factorBase: 1.2 }));
});

test('refrigeración suma (duracionMin/60) * kgCO2/h y no toca la tracción', () => {
  const traccion = calcularEmisionesCO2({ distanciaKm: 100, factorRiesgoCarretera: 0.5 });
  const con = calcularEmisionesCO2({ distanciaKm: 100, factorRiesgoCarretera: 0.5, duracionMin: 120, requiereRefrigeracion: true, co2RefrigeracionKgHora: 4 });
  assert.strictEqual(con, Number((traccion + 8).toFixed(2)));
  // requiereRefrigeracion=false ignora duración y consumo
  assert.strictEqual(calcularEmisionesCO2({ distanciaKm: 100, factorRiesgoCarretera: 0.5, duracionMin: 999, co2RefrigeracionKgHora: 99 }), traccion);
});

test('el término de frío depende de la duración (es lo que hace que cambie el ranking de rutas)', () => {
  const a = calcularEmisionesCO2({ distanciaKm: 100, duracionMin: 60, requiereRefrigeracion: true, co2RefrigeracionKgHora: 4 });
  const b = calcularEmisionesCO2({ distanciaKm: 100, duracionMin: 180, requiereRefrigeracion: true, co2RefrigeracionKgHora: 4 });
  assert.ok(b > a);
});

test('con frío, duracionMin es obligatorio: no se asume 0 en silencio', () => {
  assert.throws(() => calcularEmisionesCO2({ distanciaKm: 100, requiereRefrigeracion: true }), /duracionMin/);
  assert.throws(() => calcularEmisionesCO2({ distanciaKm: 100, requiereRefrigeracion: true, duracionMin: NaN }), /duracionMin/);
});

test('consumo de frío: opción > env > default; 0 es válido; basura lanza error', () => {
  const llamar = (extra = {}) => calcularEmisionesCO2({ distanciaKm: 0, duracionMin: 60, requiereRefrigeracion: true, ...extra });
  assert.strictEqual(llamar(), 5.36); // default = 2.68 kg/L * 2 L/h
  process.env.CO2_REFRIGERACION_KG_H = '3';
  assert.strictEqual(llamar(), 3);
  assert.strictEqual(llamar({ co2RefrigeracionKgHora: 7 }), 7); // la opción gana al env
  process.env.CO2_REFRIGERACION_KG_H = '0';
  assert.strictEqual(llamar(), 0); // 0 NO cae al default
  process.env.CO2_REFRIGERACION_KG_H = 'abc';
  assert.throws(() => llamar(), /CO2_REFRIGERACION_KG_H/);
  process.env.CO2_REFRIGERACION_KG_H = '-1';
  assert.throws(() => llamar(), /CO2_REFRIGERACION_KG_H/);
});
```

## File: backend/src/test/deteriorationRisk.propiedades.test.js
```javascript
/**
 * Complemento del test de regresión: lo que los 8 casos fijos NO cubren.
 * Ejecutar:  node --test src/test/
 */
const { test } = require('node:test');
const assert = require('node:assert');

const { calcularRiesgoDeterioro, calcularDesgloseRiesgo } = require('../utils/deteriorationRisk');
const Producto = require('../models/ProductoAgricola');
const perfilCafe = require('../data/productos/cafe'); // UNA sola fuente de verdad para el perfil
const { calcularRiesgoDeterioroOriginal, prng } = require('./fixtures/unidad1');

const BASE = { duracionMin: 60, temperatura: 20, humedad: 50, lluviaMm: 0, factorRiesgoCarretera: 0.5, variacionAltitud: 0 };
const pen = (c, p = perfilCafe) => calcularDesgloseRiesgo({ ...BASE, ...c }, p).penalizaciones;

// Perfil sintético (solo para pruebas) con lado frío y tolerancia física
const perfilFrio = {
  ...perfilCafe,
  slug: 'prueba-frio',
  toleranciaFisica: 0.5,
  sensibilidadTermica: { optimaMin: 7, optimaMax: 20, criticaMin: 2, criticaMax: 35 },
};

test('el perfil de café y el sintético pasan la validación del esquema', () => {
  assert.deepStrictEqual(Producto.validarPerfil(perfilCafe), []);
  assert.deepStrictEqual(Producto.validarPerfil(perfilFrio), []);
});

test('paridad con Unidad 1: 100.000 entradas pseudoaleatorias (seed fija, incluye fuera de rango)', () => {
  const rnd = prng(20260811);
  const r = (a, b) => a + rnd() * (b - a);
  for (let i = 0; i < 100000; i++) {
    const c = {
      duracionMin: r(-10, 600), temperatura: r(-20, 60), humedad: r(-10, 130), lluviaMm: r(-1, 60),
      factorRiesgoCarretera: r(-0.5, 2), variacionAltitud: r(-100, 3000),
    };
    assert.strictEqual(calcularRiesgoDeterioro(c, perfilCafe), calcularRiesgoDeterioroOriginal(c), JSON.stringify(c));
  }
});

test('umbrales exactos: óptimo = 0, crítico = peso completo, y justo por encima del óptimo > 0', () => {
  assert.strictEqual(pen({ temperatura: 15 }).temperatura, 0);
  assert.ok(pen({ temperatura: 15.01 }).temperatura > 0);
  assert.strictEqual(pen({ temperatura: 35 }).temperatura, perfilCafe.pesosDeterioro.temperatura);
  assert.strictEqual(pen({ humedad: 40 }).humedad, 0);
  assert.strictEqual(pen({ humedad: 100 }).humedad, perfilCafe.pesosDeterioro.humedad);
  assert.strictEqual(pen({ lluviaMm: 15 }).lluvia, perfilCafe.pesosDeterioro.lluvia);
});

test('lado frío: el perfil lo penaliza y el café lo ignora', () => {
  const w = perfilFrio.pesosDeterioro.temperatura;
  assert.strictEqual(pen({ temperatura: 7 }, perfilFrio).temperatura, 0); // optimaMin
  assert.strictEqual(pen({ temperatura: 12 }, perfilFrio).temperatura, 0); // zona óptima
  assert.ok(pen({ temperatura: 5 }, perfilFrio).temperatura > 0); // entre optimaMin y criticaMin
  assert.strictEqual(pen({ temperatura: 2 }, perfilFrio).temperatura, w); // criticaMin
  assert.strictEqual(pen({ temperatura: -10 }, perfilFrio).temperatura, w); // saturado
  assert.strictEqual(pen({ temperatura: -10 }).temperatura, 0); // café: sin lado frío
});

test('toleranciaFisica: 0 daño hasta la tolerancia, daño completo en 1, lineal entre ambos', () => {
  const w = perfilFrio.pesosDeterioro.carretera; // tolerancia 0.5
  assert.strictEqual(pen({ factorRiesgoCarretera: 0.15 }, perfilFrio).carretera, 0); // vía buena
  assert.strictEqual(pen({ factorRiesgoCarretera: 0.5 }, perfilFrio).carretera, 0); // vía regular
  assert.strictEqual(pen({ factorRiesgoCarretera: 1 }, perfilFrio).carretera, w);
  assert.ok(Math.abs(pen({ factorRiesgoCarretera: 0.75 }, perfilFrio).carretera - w * 0.5) < 1e-12);
  assert.ok(pen({ factorRiesgoCarretera: 0.5 }).carretera > 0); // café (tolerancia 0): la vía regular sí daña
});

test('perfiles inválidos lanzan error (nunca devuelven riesgo 0 en silencio)', () => {
  const invalidos = {
    'criticaMax <= optimaMax': { ...perfilCafe, sensibilidadTermica: { optimaMax: 35, criticaMax: 15 } },
    'criticaMin sin optimaMin': { ...perfilCafe, sensibilidadTermica: { criticaMin: 0, optimaMax: 15, criticaMax: 35 } },
    'criticaMin >= optimaMin': { ...perfilCafe, sensibilidadTermica: { optimaMin: 5, criticaMin: 9, optimaMax: 15, criticaMax: 35 } },
    'toleranciaFisica >= 1': { ...perfilCafe, toleranciaFisica: 1 },
    'vidaUtilHoras = 0': { ...perfilCafe, vidaUtilHoras: 0 },
    'lluviaCriticaMmH ausente': { ...perfilCafe, lluviaCriticaMmH: undefined },
  };
  for (const [nombre, perfil] of Object.entries(invalidos)) {
    assert.throws(() => calcularRiesgoDeterioro(BASE, perfil), /Perfil inválido/, nombre);
  }
  assert.throws(() => calcularRiesgoDeterioro(BASE), /perfilProducto/);
});

test('condiciones no finitas lanzan error (un NaN contaminaría el min-max de todas las rutas)', () => {
  for (const k of Object.keys(BASE)) {
    for (const malo of [undefined, NaN, Infinity]) {
      assert.throws(() => calcularRiesgoDeterioro({ ...BASE, [k]: malo }, perfilCafe), new RegExp(k));
    }
  }
});

test('propiedades: acotado en [0,100], monótono en temperatura (café) y desglose consistente', () => {
  const rnd = prng(7);
  const r = (a, b) => a + rnd() * (b - a);
  for (let i = 0; i < 20000; i++) {
    const c = { duracionMin: r(0, 600), temperatura: r(-20, 60), humedad: r(0, 130), lluviaMm: r(0, 60), factorRiesgoCarretera: r(0, 1), variacionAltitud: r(0, 3000) };
    for (const p of [perfilCafe, perfilFrio]) {
      const { riesgo, penalizaciones } = calcularDesgloseRiesgo(c, p);
      assert.ok(riesgo >= 0 && riesgo <= 100, `fuera de rango: ${riesgo}`);
      const suma = Object.values(penalizaciones).reduce((a, b) => a + b, 0) * 100;
      assert.ok(Math.abs(suma - riesgo) <= 0.05 + 1e-9, 'desglose no suma el riesgo');
    }
  }
  let previo = -1;
  for (let t = -20; t <= 60; t += 0.5) {
    const v = calcularRiesgoDeterioro({ ...BASE, temperatura: t }, perfilCafe);
    assert.ok(v >= previo, `no monótono en T=${t}`);
    previo = v;
  }
});
```

## File: backend/src/utils/busqueda.js
```javascript
function busquedaSecuencial(arreglo, objetivo, obtenerClave = (r) => r.id) {
  let comparaciones = 0;
  for (let i = 0; i < arreglo.length; i++) {
    comparaciones++;
    if (obtenerClave(arreglo[i]) === objetivo) {
      return { indice: i, comparaciones };
    }
  }
  return { indice: -1, comparaciones };
}

/**
 * @param {Array}    arreglo       Lista ORDENADA por `comparar`.
 * @param {*}        objetivo      Clave a buscar.
 * @param {Function} obtenerClave  Cómo extraer la clave de cada elemento.
 * @param {Function} comparar      Comparador (a, b) → negativo/0/positivo.
 *                                 Default: orden numérico/lexicográfico JS.
 *                                 Si los datos se ordenaron con Intl.Collator,
 *                                 pasar ese mismo comparador.
 */
function busquedaBinaria(
  arreglo,
  objetivo,
  obtenerClave = (r) => r.id,
  comparar = (a, b) => (a < b ? -1 : a > b ? 1 : 0)
) {
  let comparaciones = 0;
  let inicio = 0;
  let fin = arreglo.length - 1;

  while (inicio <= fin) {
    const medio = (inicio + fin) >>> 1;
    comparaciones++;
    const claveMedia = obtenerClave(arreglo[medio]);
    const r = comparar(claveMedia, objetivo);
    if (r === 0) return { indice: medio, comparaciones };
    if (r < 0) inicio = medio + 1;
    else fin = medio - 1;
  }
  return { indice: -1, comparaciones };
}

module.exports = { busquedaSecuencial, busquedaBinaria };
```

## File: backend/src/utils/ordenamiento.js
```javascript
const { performance } = require('perf_hooks');

// ----------------------------------------------------------------------------
// Comparador multicriterio
// ----------------------------------------------------------------------------

/** Lee un campo, incluso anidado: obtenerValor(r, 'clima.temperatura') */
function obtenerValor(obj, campo) {
  if (!campo.includes('.')) return obj == null ? undefined : obj[campo];
  return campo.split('.').reduce((v, k) => (v == null ? undefined : v[k]), obj);
}

/**
 * Convierte "riesgoDeterioro:asc,emisionesCO2Kg:desc" en
 * [{campo:'riesgoDeterioro',orden:'asc'},{campo:'emisionesCO2Kg',orden:'desc'}]
 */
function parsearCriterios(texto) {
  if (!texto) return [];
  if (Array.isArray(texto)) return texto;
  return String(texto)
    .split(',')
    .map((parte) => parte.trim())
    .filter(Boolean)
    .map((parte) => {
      const [campo, orden = 'asc'] = parte.split(':').map((s) => s.trim());
      return { campo, orden: orden.toLowerCase() === 'desc' ? 'desc' : 'asc' };
    });
}

const colador = new Intl.Collator('es', { sensitivity: 'base', numeric: true });

function esVacio(v) {
  return v == null || Number.isNaN(v);
}

function compararValores(a, b) {
  // Camino rápido: dos números (el caso más común)
  if (typeof a === 'number' && typeof b === 'number' && a === a && b === b) {
    return a < b ? -1 : a > b ? 1 : 0;
  }
  // Los valores vacíos (null/undefined/NaN) siempre van al final
  const aVacio = a == null || Number.isNaN(a);
  const bVacio = b == null || Number.isNaN(b);
  if (aVacio || bVacio) return aVacio === bVacio ? 0 : aVacio ? 1 : -1;

  if (a instanceof Date) a = a.getTime();
  if (b instanceof Date) b = b.getTime();
  if (typeof a === 'string' && typeof b === 'string') return colador.compare(a, b);
  return a < b ? -1 : a > b ? 1 : 0;
}

/**
 * Crea una función (a, b) => número que compara dos registros criterio por
 * criterio. Solo pasa al siguiente criterio si hay empate en el actual.
 */
function crearComparador(criterios) {
  const lista = parsearCriterios(criterios);
  if (lista.length === 0) throw new Error('Debe indicar al menos un criterio de ordenamiento');

  // Se prepara una vez, fuera de la comparación: función de lectura y sentido de cada criterio
  const preparados = lista.map(({ campo, orden }) => {
    const partes = campo.split('.');
    const leer = partes.length === 1 ? (o) => o[campo] : (o) => obtenerValor(o, campo);
    return { leer, desc: orden === 'desc' };
  });
  const total = preparados.length;

  return function comparar(a, b) {
    for (let i = 0; i < total; i++) {
      const c = preparados[i];
      const va = c.leer(a);
      const vb = c.leer(b);
      let r = compararValores(va, vb);
      // "desc" invierte el orden, pero los vacíos siguen al final
      if (r !== 0 && c.desc && !esVacio(va) && !esVacio(vb)) r = -r;
      if (r !== 0) return r;
    }
    return 0;
  };
}

/** Envuelve el comparador para contar cuántas comparaciones hace el algoritmo */
function contarComparaciones(comparar) {
  const contador = { comparaciones: 0 };
  const envuelto = (a, b) => {
    contador.comparaciones++;
    return comparar(a, b);
  };
  return { envuelto, contador };
}

// ----------------------------------------------------------------------------
// MergeSort
// ----------------------------------------------------------------------------

/**
 * Ordena con MergeSort y devuelve un arreglo NUEVO (no modifica el original).
 * Versión "de arriba hacia abajo" con un único arreglo auxiliar reutilizado,
 * para no crear arreglos nuevos en cada llamada recursiva.
 */
function mergeSort(arreglo, comparar) {
  const datos = arreglo.slice();
  if (datos.length < 2) return datos;
  const aux = new Array(datos.length);
  dividir(datos, aux, 0, datos.length - 1, comparar);
  return datos;
}

function dividir(datos, aux, inicio, fin, comparar) {
  if (inicio >= fin) return; // caso base: 0 o 1 elemento ya está ordenado
  const medio = (inicio + fin) >>> 1;
  dividir(datos, aux, inicio, medio, comparar); // ordenar mitad izquierda
  dividir(datos, aux, medio + 1, fin, comparar); // ordenar mitad derecha
  // Optimización: si ya están en orden, no hace falta mezclar
  if (comparar(datos[medio], datos[medio + 1]) <= 0) return;
  mezclar(datos, aux, inicio, medio, fin, comparar);
}

/** Mezcla dos tramos ordenados [inicio..medio] y [medio+1..fin] */
function mezclar(datos, aux, inicio, medio, fin, comparar) {
  for (let k = inicio; k <= fin; k++) aux[k] = datos[k];

  let i = inicio; // recorre la mitad izquierda
  let j = medio + 1; // recorre la mitad derecha
  for (let k = inicio; k <= fin; k++) {
    if (i > medio) datos[k] = aux[j++];
    else if (j > fin) datos[k] = aux[i++];
    // "<= 0" toma primero el de la izquierda en caso de empate → ESTABLE
    else if (comparar(aux[i], aux[j]) <= 0) datos[k] = aux[i++];
    else datos[k] = aux[j++];
  }
}

// ----------------------------------------------------------------------------
// QuickSort
// ----------------------------------------------------------------------------

/**
 * Ordena con QuickSort y devuelve un arreglo NUEVO.
 * - Pivote: mediana de tres (inicio, medio, fin) → evita el peor caso O(n²)
 *   con datos ya ordenados o invertidos.
 * - Partición de Hoare: funciona bien con muchos valores repetidos.
 * - Se hace recursión solo sobre la parte MÁS PEQUEÑA y se itera sobre la
 *   grande → la pila nunca supera O(log n) niveles (no hay desbordamiento).
 */
function quickSort(arreglo, comparar) {
  const datos = arreglo.slice();
  ordenarRango(datos, 0, datos.length - 1, comparar);
  return datos;
}

function ordenarRango(datos, inicio, fin, comparar) {
  while (inicio < fin) {
    const p = particionar(datos, inicio, fin, comparar);
    if (p - inicio < fin - p) {
      ordenarRango(datos, inicio, p, comparar);
      inicio = p + 1;
    } else {
      ordenarRango(datos, p + 1, fin, comparar);
      fin = p;
    }
  }
}

function intercambiar(datos, i, j) {
  const t = datos[i];
  datos[i] = datos[j];
  datos[j] = t;
}

function medianaDeTres(datos, inicio, fin, comparar) {
  const medio = (inicio + fin) >>> 1;
  if (comparar(datos[medio], datos[inicio]) < 0) intercambiar(datos, medio, inicio);
  if (comparar(datos[fin], datos[inicio]) < 0) intercambiar(datos, fin, inicio);
  if (comparar(datos[fin], datos[medio]) < 0) intercambiar(datos, fin, medio);
  return datos[medio];
}

/** Partición de Hoare: deja ≤ pivote a la izquierda de j y ≥ pivote a la derecha */
function particionar(datos, inicio, fin, comparar) {
  const pivote = medianaDeTres(datos, inicio, fin, comparar);
  let i = inicio - 1;
  let j = fin + 1;
  for (;;) {
    do i++; while (comparar(datos[i], pivote) < 0);
    do j--; while (comparar(datos[j], pivote) > 0);
    if (i >= j) return j;
    intercambiar(datos, i, j);
  }
}

// ----------------------------------------------------------------------------
// Ejecución con medición de tiempos
// ----------------------------------------------------------------------------

const ALGORITMOS = {
  merge: { nombre: 'MergeSort', fn: mergeSort, estable: true },
  quick: { nombre: 'QuickSort', fn: quickSort, estable: false },
};

/**
 * Ordena `registros` con el algoritmo indicado y mide el tiempo.
 * @param {'merge'|'quick'} algoritmo
 * @param {Array<object>} registros
 * @param {string|Array} criterios  "campo:asc,campo2:desc" o lista de objetos
 * @returns {{ datos, metricas: { algoritmo, n, criterios, tiempoMs, comparaciones, estable } }}
 */
function ordenarConMetricas(algoritmo, registros, criterios) {
  const alg = ALGORITMOS[algoritmo];
  if (!alg) throw new Error(`Algoritmo no válido: "${algoritmo}". Use "merge" o "quick"`);

  const lista = parsearCriterios(criterios);
  const { envuelto, contador } = contarComparaciones(crearComparador(lista));

  const t0 = performance.now();
  const datos = alg.fn(registros, envuelto);
  const tiempoMs = performance.now() - t0;

  return {
    datos,
    metricas: {
      algoritmo: alg.nombre,
      n: registros.length,
      criterios: lista.map((c) => `${c.campo}:${c.orden}`).join(','),
      tiempoMs: Number(tiempoMs.toFixed(4)),
      comparaciones: contador.comparaciones,
      estable: alg.estable,
    },
  };
}

/**
 * Registra en la consola del servidor el tiempo de un ordenamiento, por ejemplo:
 *   [ordenamiento] historial | MergeSort | n=4210 | 6.3121 ms | 45873 comparaciones | riesgoDeterioro:asc,emisionesCO2Kg:asc
 */
function registrarMetricas(origen, metricas) {
  console.log(
    `[ordenamiento] ${origen} | ${metricas.algoritmo} | n=${metricas.n} | ${metricas.tiempoMs} ms | ` +
    `${metricas.comparaciones} comparaciones | ${metricas.criterios}`
  );
}

/** Comprueba que un arreglo quedó ordenado según el comparador (O(n)) */
function estaOrdenado(datos, comparar) {
  for (let i = 1; i < datos.length; i++) if (comparar(datos[i - 1], datos[i]) > 0) return false;
  return true;
}

module.exports = {
  mergeSort,
  quickSort,
  crearComparador,
  parsearCriterios,
  obtenerValor,
  ordenarConMetricas,
  registrarMetricas,
  estaOrdenado,
  ALGORITMOS,
};
```

## File: backend/.env.example
```
# Puerto del servidor
PORT=4000

# Base de datos MongoDB (local o Atlas)
MONGO_URI=mongodb://localhost:27017/ruta_ecologica_cafe

# --- Ruteo (OSRM) ---
# Servidor demo público de OSRM (gratuito, sin API key). Para producción se
# recomienda auto-hospedar tu propia instancia con Docker:
# https://hub.docker.com/r/osrm/osrm-backend
OSRM_BASE_URL=https://router.project-osrm.org

# --- Altitud (Open-Elevation) ---
# API gratuita y abierta, sin API key. La instancia pública puede ser lenta;
# para producción se recomienda auto-hospedar: https://github.com/Jorl17/open-elevation
OPEN_ELEVATION_URL=https://api.open-elevation.com/api/v1/lookup

# --- Clima (OpenWeatherMap) ---
# Requiere una cuenta gratuita: https://openweathermap.org/api
OPENWEATHER_API_KEY=TU_API_KEY_DE_OPENWEATHERMAP

# Factor de emisión de CO2 por defecto (kg CO2 por km) para camión de carga liviana
CO2_EMISSION_FACTOR_KG_KM=0.9

# Origen del frontend permitido por CORS
FRONTEND_URL=http://localhost:3000
```

## File: frontend/public/index.html
```html
<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Ruta Ecológica - Pulpa de Café</title>
  </head>
  <body>
    <noscript>Necesitas habilitar JavaScript para usar esta aplicación.</noscript>
    <div id="root"></div>
  </body>
</html>
```

## File: frontend/src/components/FincaForm.jsx
```javascript
import React, { useState } from 'react';
import { crearFinca } from '../api/api';

export default function FincaForm({ puntoSeleccionado, onCreada }) {
  const [form, setForm] = useState({
    nombre: '',
    propietario: '',
    lat: puntoSeleccionado?.lat || '',
    lng: puntoSeleccionado?.lng || '',
    produccionEstimadaKgDia: '',
    contacto: '',
  });
  const [guardando, setGuardando] = useState(false);
  const [mensaje, setMensaje] = useState(null);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setGuardando(true);
    setMensaje(null);
    try {
      const nuevaFinca = await crearFinca({
        nombre: form.nombre,
        propietario: form.propietario,
        ubicacion: { lat: Number(form.lat), lng: Number(form.lng) },
        produccionEstimadaKgDia: Number(form.produccionEstimadaKgDia) || 0,
        contacto: form.contacto,
      });
      setMensaje('✅ Finca registrada correctamente');
      onCreada?.(nuevaFinca);
    } catch (error) {
      setMensaje('❌ Error al registrar la finca: ' + (error.response?.data?.mensaje || error.message));
    } finally {
      setGuardando(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="card">
      <h2>🏡 Registrar Finca Cafetera</h2>

      <label>Nombre de la finca</label>
      <input name="nombre" value={form.nombre} onChange={handleChange} required />

      <label>Propietario</label>
      <input name="propietario" value={form.propietario} onChange={handleChange} />

      <div className="grid-2">
        <div>
          <label>Latitud</label>
          <input name="lat" type="number" step="any" value={form.lat} onChange={handleChange} required />
        </div>
        <div>
          <label>Longitud</label>
          <input name="lng" type="number" step="any" value={form.lng} onChange={handleChange} required />
        </div>
      </div>

      <label>Producción estimada (kg/día)</label>
      <input
        name="produccionEstimadaKgDia"
        type="number"
        value={form.produccionEstimadaKgDia}
        onChange={handleChange}
      />

      <label>Contacto</label>
      <input name="contacto" value={form.contacto} onChange={handleChange} />

      <button type="submit" disabled={guardando}>
        {guardando ? 'Guardando...' : 'Registrar finca'}
      </button>

      {mensaje && <p>{mensaje}</p>}
    </form>
  );
}
```

## File: frontend/src/components/Header.jsx
```javascript
import React from 'react';

export default function Header() {
  return (
    <div className="app-header">
      <span className="kicker">🌱 Logística sostenible</span>
      <h1>☕ Ruta Ecológica para Transporte de Pulpa de Café</h1>
      <p>
        Selecciona el origen (finca) y destino (planta de procesamiento) para calcular
        automáticamente la ruta más ecológica según distancia, clima, altitud, estado de la vía,
        emisiones de CO₂ y riesgo de deterioro de la pulpa.
      </p>
    </div>
  );
}
```

## File: frontend/src/components/MapSelector.jsx
```javascript
import React, { useEffect, useMemo, useState } from 'react';
import { MapContainer, TileLayer, Marker, Polyline, useMap, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { decodificarPolyline } from '../utils/polyline';
import { obtenerColorRuta } from '../utils/routeColors';

// Corrige el problema conocido de Webpack/CRA con las rutas de los íconos por defecto de Leaflet,
// cargando los íconos desde un CDN público (unpkg) en vez de rutas locales rotas.
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

const containerStyle = { width: '100%', height: '450px', borderRadius: '12px' };
const centroDefault = [4.8143, -75.6946]; // Zona cafetera (Colombia) como referencia

/**
 * Captura los clics sobre el mapa de Leaflet y determina si corresponden al
 * origen (finca) o al destino (planta), sin necesidad de ninguna API key
 * (usa mosaicos de OpenStreetMap, que son gratuitos y de código abierto).
 */
function ManejadorClicMapa({ origen, destino, onSeleccionar }) {
  useMapEvents({
    click(e) {
      const punto = { lat: e.latlng.lat, lng: e.latlng.lng };
      if (!origen) {
        onSeleccionar({ origen: punto, destino });
      } else if (!destino) {
        onSeleccionar({ origen, destino: punto });
      } else {
        // Reiniciar selección
        onSeleccionar({ origen: punto, destino: null });
      }
    },
  });
  return null;
}

/**
 * Ajusta automáticamente el zoom/centro del mapa cuando cambian origen/destino
 * o cuando se dibujan rutas nuevas sobre el mapa (para que todas queden visibles).
 */
function AjustarVista({ origen, destino, rutasDecodificadas }) {
  const map = useMap();
  useEffect(() => {
    if (!map) return;

    if (rutasDecodificadas && rutasDecodificadas.length > 0) {
      const todosLosPuntos = rutasDecodificadas.flatMap((r) =>
        r.puntos.map((p) => [p.lat, p.lng])
      );
      if (todosLosPuntos.length > 0) {
        map.fitBounds(L.latLngBounds(todosLosPuntos), { padding: [40, 40] });
        return;
      }
    }

    if (origen && destino) {
      const bounds = L.latLngBounds([
        [origen.lat, origen.lng],
        [destino.lat, destino.lng],
      ]);
      map.fitBounds(bounds, { padding: [40, 40] });
    } else if (origen) {
      map.setView([origen.lat, origen.lng], 12);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [origen, destino, rutasDecodificadas]);
  return null;
}

/**
 * Mapa interactivo basado en OpenStreetMap (Leaflet), sin necesidad de ninguna API key:
 * - Primer clic define el ORIGEN (finca).
 * - Segundo clic define el DESTINO (planta).
 * - Un tercer clic reinicia la selección.
 * - Si se reciben rutas evaluadas, se dibujan TODAS sobre el mapa: la recomendada
 *   en verde y con mayor grosor, y cada alternativa con un color distinto.
 * - Se puede hacer clic sobre cualquier ruta dibujada para seleccionarla.
 * Además incluye un formulario para ingresar coordenadas manualmente como alternativa.
 */
export default function MapSelector({
  origen,
  destino,
  onSeleccionar,
  rutas = [],
  rutaRecomendadaId = null,
  rutaSeleccionadaId = null,
  onSeleccionarRuta = () => {},
}) {
  // Decodifica la polyline de cada ruta evaluada y le asigna su color/estilo
  const rutasDecodificadas = useMemo(() => {
    return rutas.map((ruta, index) => {
      const esRecomendada = ruta.id === rutaRecomendadaId;
      return {
        id: ruta.id,
        resumen: ruta.resumen,
        puntos: decodificarPolyline(ruta.polyline),
        color: obtenerColorRuta(index, esRecomendada),
        esRecomendada,
      };
    });
  }, [rutas, rutaRecomendadaId]);

  // Dibuja primero las rutas normales y al final la seleccionada/recomendada,
  // para que siempre queden visibles por encima de las demás.
  const rutasOrdenadasParaDibujar = useMemo(() => {
    return [...rutasDecodificadas].sort((a, b) => {
      const pesoA = a.id === rutaSeleccionadaId ? 2 : a.esRecomendada ? 1 : 0;
      const pesoB = b.id === rutaSeleccionadaId ? 2 : b.esRecomendada ? 1 : 0;
      return pesoA - pesoB;
    });
  }, [rutasDecodificadas, rutaSeleccionadaId]);

  const centroInicial = origen ? [origen.lat, origen.lng] : centroDefault;

  return (
    <div className="card">
      <p style={{ marginTop: 0 }}>
        📍 Haz clic en el mapa: primer clic = <strong>finca (origen)</strong>, segundo clic ={' '}
        <strong>planta (destino)</strong>. Un tercer clic reinicia la selección.
        {rutas.length > 0 && (
          <>
            {' '}
            🖱️ También puedes hacer clic sobre <strong>cualquier ruta dibujada</strong> para
            seleccionarla y ver sus detalles.
          </>
        )}{' '}
        También puedes escribir las coordenadas manualmente abajo.
      </p>

      <MapContainer center={centroInicial} zoom={7} style={containerStyle} scrollWheelZoom>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <ManejadorClicMapa origen={origen} destino={destino} onSeleccionar={onSeleccionar} />
        <AjustarVista origen={origen} destino={destino} rutasDecodificadas={rutasDecodificadas} />
        {origen && <Marker position={[origen.lat, origen.lng]} title="Finca (origen)" />}
        {destino && <Marker position={[destino.lat, destino.lng]} title="Planta (destino)" />}

        {rutasOrdenadasParaDibujar.map((ruta) => {
          const estaSeleccionada = ruta.id === rutaSeleccionadaId;
          const latLngs = ruta.puntos.map((p) => [p.lat, p.lng]);
          if (latLngs.length === 0) return null;

          return (
            <Polyline
              key={ruta.id}
              positions={latLngs}
              pathOptions={{
                color: ruta.color,
                weight: ruta.esRecomendada ? 7 : estaSeleccionada ? 6 : 4,
                opacity: estaSeleccionada || ruta.esRecomendada ? 0.95 : 0.65,
                dashArray: estaSeleccionada && !ruta.esRecomendada ? '8 6' : null,
                lineCap: 'round',
              }}
              eventHandlers={{
                click: (e) => {
                  L.DomEvent.stopPropagation(e);
                  onSeleccionarRuta(ruta.id);
                },
                mouseover: (e) => e.target.setStyle({ opacity: 1 }),
                mouseout: (e) =>
                  e.target.setStyle({
                    opacity: estaSeleccionada || ruta.esRecomendada ? 0.95 : 0.65,
                  }),
              }}
            />
          );
        })}
      </MapContainer>

      {rutasDecodificadas.length > 0 && (
        <div className="leyenda-rutas">
          {rutasDecodificadas.map((ruta) => (
            <button
              key={ruta.id}
              type="button"
              className={`leyenda-item ${ruta.id === rutaSeleccionadaId ? 'activa' : ''}`}
              onClick={() => onSeleccionarRuta(ruta.id)}
            >
              <span className="leyenda-swatch" style={{ backgroundColor: ruta.color }} />
              {ruta.esRecomendada ? '⭐ ' : ''}
              {ruta.resumen}
              {ruta.esRecomendada ? ' (recomendada)' : ''}
            </button>
          ))}
        </div>
      )}

      <div style={{ marginTop: 12 }}>
        <p>
          Origen: {origen ? `${origen.lat.toFixed(5)}, ${origen.lng.toFixed(5)}` : 'no seleccionado'}
          {'  |  '}
          Destino: {destino ? `${destino.lat.toFixed(5)}, ${destino.lng.toFixed(5)}` : 'no seleccionado'}
        </p>
      </div>

      <CoordenadasManualForm origen={origen} destino={destino} onSeleccionar={onSeleccionar} />
    </div>
  );
}

/**
 * Formulario alterno para ingresar las coordenadas de origen y destino a mano,
 * útil si prefieres escribir las coordenadas en vez de hacer clic en el mapa
 * (por ejemplo, copiándolas desde Google Maps o desde el registro de una finca).
 */
function CoordenadasManualForm({ origen, destino, onSeleccionar }) {
  const [form, setForm] = useState({
    origenLat: origen?.lat ?? '',
    origenLng: origen?.lng ?? '',
    destinoLat: destino?.lat ?? '',
    destinoLng: destino?.lng ?? '',
  });
  const [errorLocal, setErrorLocal] = useState(null);

  useEffect(() => {
    setForm({
      origenLat: origen?.lat ?? '',
      origenLng: origen?.lng ?? '',
      destinoLat: destino?.lat ?? '',
      destinoLng: destino?.lng ?? '',
    });
  }, [origen, destino]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleAplicar = () => {
    const { origenLat, origenLng, destinoLat, destinoLng } = form;

    if (origenLat === '' || origenLng === '' || destinoLat === '' || destinoLng === '') {
      setErrorLocal('Completa las 4 coordenadas (latitud y longitud de origen y destino).');
      return;
    }

    const nuevoOrigen = { lat: Number(origenLat), lng: Number(origenLng) };
    const nuevoDestino = { lat: Number(destinoLat), lng: Number(destinoLng) };

    if ([nuevoOrigen.lat, nuevoOrigen.lng, nuevoDestino.lat, nuevoDestino.lng].some(Number.isNaN)) {
      setErrorLocal('Las coordenadas deben ser números válidos (ej: 4.8143, -75.6946).');
      return;
    }

    setErrorLocal(null);
    onSeleccionar({ origen: nuevoOrigen, destino: nuevoDestino });
  };

  const handleLimpiar = () => {
    setForm({ origenLat: '', origenLng: '', destinoLat: '', destinoLng: '' });
    onSeleccionar({ origen: null, destino: null });
  };

  return (
    <div style={{ marginTop: 10 }}>
      <h4 style={{ marginBottom: 6 }}>📍 O ingresa las coordenadas manualmente</h4>
      <div className="grid-2">
        <div>
          <label>Latitud finca (origen)</label>
          <input
            name="origenLat"
            type="number"
            step="any"
            placeholder="Ej: 4.8143"
            value={form.origenLat}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Longitud finca (origen)</label>
          <input
            name="origenLng"
            type="number"
            step="any"
            placeholder="Ej: -75.6946"
            value={form.origenLng}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Latitud planta (destino)</label>
          <input
            name="destinoLat"
            type="number"
            step="any"
            placeholder="Ej: 4.9020"
            value={form.destinoLat}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Longitud planta (destino)</label>
          <input
            name="destinoLng"
            type="number"
            step="any"
            placeholder="Ej: -75.8120"
            value={form.destinoLng}
            onChange={handleChange}
          />
        </div>
      </div>

      {errorLocal && <p style={{ color: '#b03a2e' }}>{errorLocal}</p>}

      <div style={{ display: 'flex', gap: 10 }}>
        <button type="button" onClick={handleAplicar}>
          Usar estas coordenadas
        </button>
        <button type="button" onClick={handleLimpiar} style={{ backgroundColor: '#8a7a68' }}>
          Limpiar
        </button>
      </div>
    </div>
  );
}
```

## File: frontend/src/components/PlantaForm.jsx
```javascript
import React, { useState } from 'react';
import { crearPlanta } from '../api/api';

export default function PlantaForm({ puntoSeleccionado, onCreada }) {
  const [form, setForm] = useState({
    nombre: '',
    lat: puntoSeleccionado?.lat || '',
    lng: puntoSeleccionado?.lng || '',
    capacidadRecepcionKgDia: '',
    contacto: '',
  });
  const [guardando, setGuardando] = useState(false);
  const [mensaje, setMensaje] = useState(null);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setGuardando(true);
    setMensaje(null);
    try {
      const nuevaPlanta = await crearPlanta({
        nombre: form.nombre,
        ubicacion: { lat: Number(form.lat), lng: Number(form.lng) },
        capacidadRecepcionKgDia: Number(form.capacidadRecepcionKgDia) || 0,
        contacto: form.contacto,
      });
      setMensaje('✅ Planta registrada correctamente');
      onCreada?.(nuevaPlanta);
    } catch (error) {
      setMensaje('❌ Error al registrar la planta: ' + (error.response?.data?.mensaje || error.message));
    } finally {
      setGuardando(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="card">
      <h2>🏭 Registrar Planta de Procesamiento</h2>

      <label>Nombre de la planta</label>
      <input name="nombre" value={form.nombre} onChange={handleChange} required />

      <div className="grid-2">
        <div>
          <label>Latitud</label>
          <input name="lat" type="number" step="any" value={form.lat} onChange={handleChange} required />
        </div>
        <div>
          <label>Longitud</label>
          <input name="lng" type="number" step="any" value={form.lng} onChange={handleChange} required />
        </div>
      </div>

      <label>Capacidad de recepción (kg/día)</label>
      <input
        name="capacidadRecepcionKgDia"
        type="number"
        value={form.capacidadRecepcionKgDia}
        onChange={handleChange}
      />

      <label>Contacto</label>
      <input name="contacto" value={form.contacto} onChange={handleChange} />

      <button type="submit" disabled={guardando}>
        {guardando ? 'Guardando...' : 'Registrar planta'}
      </button>

      {mensaje && <p>{mensaje}</p>}
    </form>
  );
}
```

## File: frontend/src/components/RouteResults.jsx
```javascript
import React from 'react';
import { obtenerColorRuta } from '../utils/routeColors';
import { CRITERIOS } from '../utils/criterios';

export default function RouteResults({
  resultado,
  rutaSeleccionadaId,
  onSeleccionarRuta,
  criterioActivo,
  onSeleccionarCriterio,
}) {
  if (!resultado) return null;

  const { rutasEvaluadas, rutaRecomendada } = resultado;

  const rutaActiva =
    rutasEvaluadas.find((r) => r.id === rutaSeleccionadaId) || rutaRecomendada;

  // Etiqueta de "por qué" quedó seleccionada la ruta activa: por un criterio
  // predefinido (botón) o por selección manual (clic directo en el mapa/tabla).
  const criterioInfo = CRITERIOS.find((c) => c.key === criterioActivo);
  const razonSeleccion = criterioInfo
    ? `Seleccionada por: ${criterioInfo.label}`
    : 'Seleccionada manualmente';

  return (
    <div className="card">
      <h2>Resultado de la evaluación</h2>
      <p>
        Se evaluaron <strong>{rutasEvaluadas.length}</strong> rutas alternativas. La ruta más
        ecológica (según el puntaje combinado) es:
      </p>

      <div className="ruta-card recomendada">
        <h3>
          🏆 {rutaRecomendada.resumen}
          <span className={`badge ${rutaRecomendada.estadoCarretera}`}>
            {rutaRecomendada.estadoCarretera.toUpperCase()}
          </span>
        </h3>
        <IndicadoresRuta ruta={rutaRecomendada} />
      </div>

      <h3 style={{ marginTop: 24 }}>🎯 Elegir la ruta por un parámetro específico</h3>
      <p style={{ marginTop: -8, color: '#5b4636', fontSize: 14 }}>
        Ya con las rutas calculadas, puedes ver cuál gana en cada parámetro individual — no
        siempre es la misma ruta que el puntaje ecológico combinado. Al elegir uno, se resalta esa
        ruta tanto en la tabla como en el mapa.
      </p>
      <SelectorCriterios criterioActivo={criterioActivo} onSeleccionarCriterio={onSeleccionarCriterio} />

      <h3 style={{ marginTop: 24 }}>📊 Panel comparativo de rutas</h3>
      <p style={{ marginTop: -8, color: '#5b4636', fontSize: 14 }}>
        También puedes hacer clic directamente en una fila (o en una ruta dentro del mapa) para
        verla en detalle. La fila en verde 🏆 es la ruta más ecológica; la fila con borde azul es
        la que tienes seleccionada actualmente.
      </p>

      <TablaComparativa
        rutas={rutasEvaluadas}
        rutaRecomendadaId={rutaRecomendada.id}
        rutaSeleccionadaId={rutaActiva.id}
        onSeleccionarRuta={onSeleccionarRuta}
      />

      <h3 style={{ marginTop: 24 }}>Detalle de la ruta seleccionada</h3>
      <div
        className={`ruta-card ${rutaActiva.id === rutaRecomendada.id ? 'recomendada' : 'seleccionada'}`}
      >
        <h4>
          {rutaActiva.id === rutaRecomendada.id ? '🏆 ' : '🎯 '}
          {rutaActiva.resumen}
          <span className={`badge ${rutaActiva.estadoCarretera}`}>
            {rutaActiva.estadoCarretera.toUpperCase()}
          </span>
        </h4>
        <p style={{ margin: '4px 0 0', fontSize: 13, color: '#5b4636', fontWeight: 600 }}>
          {razonSeleccion}
        </p>
        <IndicadoresRuta ruta={rutaActiva} />
      </div>

      <h3 style={{ marginTop: 24 }}>Todas las rutas evaluadas</h3>
      {rutasEvaluadas.map((ruta, index) => {
        const esRecomendada = ruta.id === rutaRecomendada.id;
        const estaSeleccionada = ruta.id === rutaActiva.id;
        return (
          <div
            key={ruta.id}
            className={`ruta-card ${esRecomendada ? 'recomendada' : ''} ${
              estaSeleccionada && !esRecomendada ? 'seleccionada' : ''
            }`}
            style={{ cursor: 'pointer' }}
            onClick={() => onSeleccionarRuta && onSeleccionarRuta(ruta.id)}
          >
            <h4>
              <span
                className="leyenda-swatch"
                style={{ backgroundColor: obtenerColorRuta(index, esRecomendada) }}
              />
              {esRecomendada ? '🏆 ' : ''}
              {ruta.resumen}
              <span className={`badge ${ruta.estadoCarretera}`}>
                {ruta.estadoCarretera.toUpperCase()}
              </span>
            </h4>
            <IndicadoresRuta ruta={ruta} />
          </div>
        );
      })}
    </div>
  );
}

/** Fila de botones tipo "pill" para elegir la ruta ganadora de un parámetro individual */
function SelectorCriterios({ criterioActivo, onSeleccionarCriterio }) {
  return (
    <div className="criterios-selector">
      {CRITERIOS.map((c) => (
        <button
          key={c.key}
          type="button"
          className={`criterio-btn ${criterioActivo === c.key ? 'activo' : ''}`}
          onClick={() => onSeleccionarCriterio && onSeleccionarCriterio(c.key)}
        >
          {c.label}
        </button>
      ))}
    </div>
  );
}

/** Tabla comparativa con las estadísticas clave de todas las rutas evaluadas */
function TablaComparativa({ rutas, rutaRecomendadaId, rutaSeleccionadaId, onSeleccionarRuta }) {
  return (
    <div style={{ overflowX: 'auto' }}>
      <table className="tabla-comparativa">
        <thead>
          <tr>
            <th></th>
            <th>Ruta</th>
            <th>📏 Distancia</th>
            <th>⏱️ Duración</th>
            <th>⛰️ Altitud prom.</th>
            <th>🍃 CO₂</th>
            <th>⚠️ Riesgo deterioro</th>
            <th>🚦 Estado vía</th>
            <th>🏆 Puntaje</th>
          </tr>
        </thead>
        <tbody>
          {rutas.map((ruta, index) => {
            const esRecomendada = ruta.id === rutaRecomendadaId;
            const estaSeleccionada = ruta.id === rutaSeleccionadaId;
            return (
              <tr
                key={ruta.id}
                className={`fila-ruta ${esRecomendada ? 'fila-recomendada' : ''} ${
                  estaSeleccionada ? 'fila-seleccionada' : ''
                }`}
                onClick={() => onSeleccionarRuta && onSeleccionarRuta(ruta.id)}
              >
                <td>
                  <span
                    className="leyenda-swatch"
                    style={{ backgroundColor: obtenerColorRuta(index, esRecomendada) }}
                  />
                </td>
                <td>
                  {esRecomendada ? '🏆 ' : ''}
                  {ruta.resumen}
                </td>
                <td>{ruta.distanciaKm.toFixed(1)} km</td>
                <td>{Math.round(ruta.duracionMin)} min</td>
                <td>{ruta.altitudPromedio} msnm</td>
                <td>{ruta.emisionesCO2Kg} kg</td>
                <td>{ruta.riesgoDeterioro}/100</td>
                <td>
                  <span className={`badge ${ruta.estadoCarretera}`}>
                    {ruta.estadoCarretera.toUpperCase()}
                  </span>
                </td>
                <td>
                  <strong>{ruta.puntajeEcologico}</strong>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function IndicadoresRuta({ ruta }) {
  return (
    <div className="indicadores">
      <div className="indicador">📏 Distancia: <strong>{ruta.distanciaKm.toFixed(1)} km</strong></div>
      <div className="indicador">⏱️ Duración: <strong>{Math.round(ruta.duracionMin)} min</strong></div>
      <div className="indicador">⛰️ Altitud prom.: <strong>{ruta.altitudPromedio} msnm</strong></div>
      <div className="indicador">🌦️ Clima: <strong>{ruta.clima.descripcion}</strong> ({ruta.clima.temperatura}°C, {ruta.clima.humedad}% hum.)</div>
      <div className="indicador">🍃 CO₂: <strong>{ruta.emisionesCO2Kg} kg</strong></div>
      <div className="indicador">⚠️ Riesgo deterioro pulpa: <strong>{ruta.riesgoDeterioro}/100</strong></div>
      <div className="indicador" style={{ gridColumn: 'span 3', background: '#fff8e6' }}>
        🏆 Puntaje ecológico (menor = mejor): <strong>{ruta.puntajeEcologico}</strong>
      </div>
    </div>
  );
}
```

## File: frontend/src/utils/criterios.js
```javascript
/**
 * Criterios individuales por los que el usuario puede elegir la ruta,
 * además del puntaje ecológico combinado que ya calcula el backend.
 * `campo` es el nombre exacto del indicador dentro de cada ruta evaluada
 * (tal como lo devuelve /api/rutas/evaluar); todos son "menor = mejor".
 */
export const CRITERIOS = [
  { key: 'ecologico', label: '🏆 Puntaje ecológico', campo: 'puntajeEcologico', corto: 'Puntaje ecológico' },
  { key: 'distancia', label: '📏 Menor distancia', campo: 'distanciaKm', corto: 'Menor distancia' },
  { key: 'tiempo', label: '⏱️ Menor tiempo', campo: 'duracionMin', corto: 'Menor tiempo' },
  { key: 'co2', label: '🍃 Menor CO₂', campo: 'emisionesCO2Kg', corto: 'Menor CO₂' },
  { key: 'riesgo', label: '⚠️ Menor riesgo', campo: 'riesgoDeterioro', corto: 'Menor riesgo de deterioro' },
];

/**
 * Devuelve la ruta ganadora (la de menor valor) para un criterio dado,
 * dentro del arreglo de rutas evaluadas de una consulta.
 */
export function obtenerRutaPorCriterio(rutasEvaluadas, criterioKey) {
  const criterio = CRITERIOS.find((c) => c.key === criterioKey) || CRITERIOS[0];
  if (!rutasEvaluadas || rutasEvaluadas.length === 0) return null;

  return rutasEvaluadas.reduce((mejor, actual) =>
    actual[criterio.campo] < mejor[criterio.campo] ? actual : mejor
  );
}
```

## File: frontend/src/utils/routeColors.js
```javascript
/**
 * Paleta de colores para diferenciar visualmente cada ruta alternativa en el mapa
 * y en la tabla comparativa. La ruta recomendada SIEMPRE usa el verde reservado
 * (COLOR_RUTA_RECOMENDADA), sin importar su posición en la lista.
 */
export const PALETA_COLORES_RUTAS = [
  '#1f77b4', // azul
  '#ff7f0e', // naranja
  '#9467bd', // morado
  '#e377c2', // rosa
  '#17becf', // cian
  '#8c564b', // marrón
  '#bcbd22', // oliva
  '#d62728', // rojo
];

export const COLOR_RUTA_RECOMENDADA = '#2e7d32';

/**
 * Devuelve el color asignado a una ruta según su posición en la lista de
 * rutas evaluadas. Si es la ruta recomendada, siempre devuelve el verde
 * reservado para destacarla del resto.
 */
export function obtenerColorRuta(index, esRecomendada) {
  if (esRecomendada) return COLOR_RUTA_RECOMENDADA;
  return PALETA_COLORES_RUTAS[index % PALETA_COLORES_RUTAS.length];
}
```

## File: frontend/src/index.css
```css
/* =========================================================
   VARIABLES DE TEMA — paleta "café"
   ========================================================= */
:root {
  --cafe-950: #2a1810;
  --cafe-900: #3b2418;
  --cafe-800: #4b2e1e;
  --cafe-700: #5b3a29;
  --cafe-600: #7a4f36;
  --cafe-500: #8a5a3c;
  --cafe-caramelo: #c9822e;
  --cafe-caramelo-claro: #e0a458;
  --crema-100: #fff8ec;
  --crema-200: #f7ecd9;
  --crema-300: #efe0c4;
  --verde-eco: #2e7d32;
  --verde-eco-claro: #4caf50;
  --azul-seleccion: #1f77b4;
  --texto: #2e2015;
  --texto-suave: #6b5645;
  --sombra: 0 8px 24px rgba(59, 36, 24, 0.14);
  --sombra-fuerte: 0 14px 34px rgba(59, 36, 24, 0.22);
  --radio: 16px;
}

* {
  box-sizing: border-box;
}

/* =========================================================
   FONDO GENERAL — degradado café + "manchas" hechas con CSS
   (no requiere ninguna imagen externa)
   ========================================================= */
html, body {
  min-height: 100%;
}

body {
  margin: 0;
  font-family: 'Inter', 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  color: var(--texto);
  background-color: var(--cafe-900);
  background-image:
    radial-gradient(circle at 12% 18%, rgba(201, 130, 46, 0.35), transparent 38%),
    radial-gradient(circle at 85% 10%, rgba(139, 90, 60, 0.4), transparent 42%),
    radial-gradient(circle at 90% 80%, rgba(46, 125, 50, 0.18), transparent 40%),
    radial-gradient(circle at 8% 85%, rgba(224, 164, 88, 0.25), transparent 40%),
    linear-gradient(160deg, var(--cafe-950) 0%, var(--cafe-800) 45%, var(--cafe-700) 100%);
  background-attachment: fixed;
  background-repeat: no-repeat;
  background-size: cover;
}

/* Textura sutil de "granos" flotando sobre el fondo */
body::before {
  content: '';
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 0;
  opacity: 0.5;
  background-image:
    radial-gradient(ellipse 5px 8px at 10% 20%, rgba(0,0,0,0.25), transparent 60%),
    radial-gradient(ellipse 4px 7px at 80% 15%, rgba(0,0,0,0.2), transparent 60%),
    radial-gradient(ellipse 6px 9px at 60% 70%, rgba(0,0,0,0.18), transparent 60%),
    radial-gradient(ellipse 4px 6px at 25% 85%, rgba(0,0,0,0.2), transparent 60%),
    radial-gradient(ellipse 5px 8px at 92% 60%, rgba(0,0,0,0.15), transparent 60%),
    radial-gradient(ellipse 4px 7px at 45% 35%, rgba(0,0,0,0.15), transparent 60%);
  background-repeat: repeat;
  background-size: 340px 340px;
}

/* =========================================================
   CONTENEDOR PRINCIPAL
   ========================================================= */
.app-container {
  position: relative;
  z-index: 1;
  max-width: 1200px;
  margin: 0 auto;
  padding: 32px 20px 60px;
}

/* =========================================================
   TARJETAS — efecto "glass" cálido
   ========================================================= */
.card {
  background: rgba(255, 248, 236, 0.94);
  backdrop-filter: blur(6px);
  border: 1px solid rgba(139, 90, 60, 0.15);
  border-radius: var(--radio);
  padding: 24px;
  box-shadow: var(--sombra);
  margin-bottom: 24px;
  transition: box-shadow 0.25s ease, transform 0.25s ease;
}

.card:hover {
  box-shadow: var(--sombra-fuerte);
}

.grid-2 {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

@media (max-width: 900px) {
  .grid-2 {
    grid-template-columns: 1fr;
  }
}

/* =========================================================
   TIPOGRAFÍA
   ========================================================= */
h1, h2, h3, h4 {
  font-family: 'Playfair Display', 'Segoe UI', serif;
  color: var(--cafe-900);
  letter-spacing: 0.2px;
}

h1 {
  font-size: 2.1rem;
  font-weight: 800;
  background: linear-gradient(90deg, var(--cafe-800), var(--cafe-caramelo) 60%, var(--verde-eco));
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  display: inline-block;
}

h2 {
  font-size: 1.4rem;
  border-bottom: 2px solid var(--crema-300);
  padding-bottom: 8px;
  margin-top: 0;
}

h3 { font-size: 1.15rem; }

p { color: var(--texto-suave); line-height: 1.55; }

/* =========================================================
   ENCABEZADO
   ========================================================= */
.app-header {
  text-align: center;
  margin-bottom: 28px;
  padding: 8px 12px 4px;
}

.app-header .kicker {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: rgba(46, 125, 50, 0.12);
  color: var(--verde-eco);
  font-weight: 700;
  font-size: 12px;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  padding: 6px 14px;
  border-radius: 20px;
  margin-bottom: 14px;
}

.app-header p {
  max-width: 680px;
  margin: 10px auto 0;
  color: var(--crema-200);
}

/* =========================================================
   BOTONES
   ========================================================= */
button {
  background: linear-gradient(135deg, var(--verde-eco-claro), var(--verde-eco));
  color: white;
  border: none;
  padding: 11px 20px;
  border-radius: 10px;
  cursor: pointer;
  font-size: 15px;
  font-weight: 600;
  box-shadow: 0 4px 14px rgba(46, 125, 50, 0.35);
  transition: transform 0.15s ease, box-shadow 0.15s ease, filter 0.15s ease;
}

button:hover:not(:disabled) {
  transform: translateY(-1px);
  filter: brightness(1.05);
  box-shadow: 0 6px 18px rgba(46, 125, 50, 0.45);
}

button:active:not(:disabled) {
  transform: translateY(0);
}

button:disabled {
  background: #b8ac9c;
  box-shadow: none;
  cursor: not-allowed;
}

/* Botón secundario (ej: "Limpiar") */
button.secundario,
button[style*="8a7a68"] {
  background: linear-gradient(135deg, var(--cafe-500), var(--cafe-700)) !important;
  box-shadow: 0 4px 14px rgba(91, 58, 41, 0.35) !important;
}

/* =========================================================
   FORMULARIOS
   ========================================================= */
input, select {
  width: 100%;
  padding: 10px 12px;
  margin: 6px 0 14px 0;
  border: 1.5px solid var(--crema-300);
  border-radius: 8px;
  font-size: 14px;
  background: var(--crema-100);
  color: var(--texto);
  transition: border-color 0.15s ease, box-shadow 0.15s ease;
}

input:focus, select:focus {
  outline: none;
  border-color: var(--cafe-caramelo);
  box-shadow: 0 0 0 3px rgba(201, 130, 46, 0.18);
}

label {
  font-weight: 600;
  font-size: 13px;
  color: var(--cafe-700);
  text-transform: uppercase;
  letter-spacing: 0.4px;
}

/* =========================================================
   TABS
   ========================================================= */
.tabs {
  display: flex;
  gap: 10px;
  margin-bottom: 22px;
  flex-wrap: wrap;
}

.tab {
  padding: 10px 20px;
  border-radius: 30px;
  cursor: pointer;
  background: rgba(255, 248, 236, 0.85);
  color: var(--cafe-800);
  font-weight: 600;
  border: 1.5px solid rgba(139, 90, 60, 0.2);
  transition: all 0.2s ease;
}

.tab:hover {
  background: rgba(255, 248, 236, 1);
  transform: translateY(-1px);
}

.tab.active {
  background: linear-gradient(135deg, var(--cafe-caramelo-claro), var(--cafe-caramelo));
  color: white;
  border-color: transparent;
  box-shadow: 0 4px 14px rgba(201, 130, 46, 0.4);
}

/* =========================================================
   TARJETAS DE RUTA
   ========================================================= */
.ruta-card {
  border: 2px solid var(--crema-300);
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 14px;
  background: var(--crema-100);
  transition: transform 0.15s ease, box-shadow 0.15s ease;
}

.ruta-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(59, 36, 24, 0.12);
}

.ruta-card.recomendada {
  border-color: var(--verde-eco);
  background: linear-gradient(135deg, #eef7ee, #f3faf0);
  box-shadow: 0 0 0 2px rgba(46, 125, 50, 0.22);
}

.ruta-card.seleccionada {
  border-color: var(--azul-seleccion);
  background: linear-gradient(135deg, #eaf3fb, #f0f7fc);
}

/* =========================================================
   BADGES DE ESTADO DE VÍA
   ========================================================= */
.badge {
  display: inline-block;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.4px;
  color: white;
  margin-left: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
}

.badge.bueno { background: linear-gradient(135deg, #4caf50, #2e7d32); }
.badge.regular { background: linear-gradient(135deg, #e0a458, #c9822e); }
.badge.malo { background: linear-gradient(135deg, #e05a4e, #b03a2e); }

/* =========================================================
   INDICADORES (métricas por ruta)
   ========================================================= */
.indicadores {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  font-size: 13px;
  margin-top: 12px;
}

@media (max-width: 700px) {
  .indicadores {
    grid-template-columns: 1fr 1fr;
  }
}

.indicador {
  background: white;
  padding: 10px 12px;
  border-radius: 8px;
  border: 1px solid var(--crema-300);
  color: var(--texto);
}

/* =========================================================
   SELECTOR DE CRITERIOS INDIVIDUALES (distancia, tiempo, CO2, riesgo)
   ========================================================= */
.criterios-selector {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin: 4px 0 20px;
}

.criterio-btn {
  background: white;
  color: var(--cafe-800);
  border: 1.5px solid var(--crema-300);
  border-radius: 30px;
  padding: 9px 18px;
  font-size: 13.5px;
  font-weight: 600;
  cursor: pointer;
  box-shadow: none;
  transition: all 0.18s ease;
}

.criterio-btn:hover:not(.activo) {
  border-color: var(--cafe-caramelo);
  transform: translateY(-1px);
  box-shadow: 0 4px 10px rgba(59, 36, 24, 0.1);
}

.criterio-btn.activo {
  background: linear-gradient(135deg, var(--azul-seleccion), #16639a);
  color: white;
  border-color: transparent;
  box-shadow: 0 4px 14px rgba(31, 119, 180, 0.35);
}

/* Cuando el criterio activo es el ecológico, usar el verde en vez del azul
   para que combine con el color que ya identifica a la ruta recomendada */
.criterio-btn.activo:first-child {
  background: linear-gradient(135deg, var(--verde-eco-claro), var(--verde-eco));
  box-shadow: 0 4px 14px rgba(46, 125, 50, 0.35);
}

/* =========================================================
   LEYENDA DE RUTAS (bajo el mapa)
   ========================================================= */
.leyenda-rutas {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 14px;
}

.leyenda-item {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  background: white;
  color: var(--texto);
  border: 1.5px solid var(--crema-300);
  border-radius: 20px;
  padding: 7px 14px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s ease;
}

.leyenda-item:hover {
  border-color: var(--cafe-caramelo);
  transform: translateY(-1px);
}

.leyenda-item.activa {
  border-color: var(--azul-seleccion);
  background: #eaf3fb;
  box-shadow: 0 0 0 2px rgba(31, 119, 180, 0.18);
}

.leyenda-swatch {
  display: inline-block;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  flex-shrink: 0;
  box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.06);
}

.ruta-card h4 .leyenda-swatch {
  margin-right: 8px;
}

/* =========================================================
   TABLA COMPARATIVA
   ========================================================= */
.tabla-comparativa {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  margin-top: 14px;
  font-size: 13px;
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(59, 36, 24, 0.08);
}

.tabla-comparativa th,
.tabla-comparativa td {
  padding: 12px 14px;
  text-align: left;
  border-bottom: 1px solid var(--crema-300);
  white-space: nowrap;
}

.tabla-comparativa th {
  background: linear-gradient(135deg, var(--cafe-800), var(--cafe-700));
  color: var(--crema-100);
  font-weight: 700;
  text-transform: uppercase;
  font-size: 11px;
  letter-spacing: 0.4px;
}

.tabla-comparativa .fila-ruta {
  cursor: pointer;
  transition: background-color 0.15s ease;
}

.tabla-comparativa .fila-ruta:hover {
  background: var(--crema-200);
}

.tabla-comparativa .fila-recomendada {
  background: #eef7ee;
  font-weight: 600;
}

.tabla-comparativa .fila-seleccionada {
  box-shadow: inset 4px 0 0 var(--azul-seleccion);
  background: #eaf3fb;
}

.tabla-comparativa .fila-recomendada.fila-seleccionada {
  box-shadow: inset 4px 0 0 var(--verde-eco);
  background: #eef7ee;
}

/* =========================================================
   SCROLLBAR (detalle estético en navegadores webkit)
   ========================================================= */
::-webkit-scrollbar {
  width: 10px;
  height: 10px;
}

::-webkit-scrollbar-track {
  background: var(--crema-200);
}

::-webkit-scrollbar-thumb {
  background: var(--cafe-500);
  border-radius: 10px;
}

::-webkit-scrollbar-thumb:hover {
  background: var(--cafe-700);
}
```

## File: frontend/src/index.js
```javascript
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

## File: frontend/.env.example
```
# URL base de la API backend
REACT_APP_API_URL=http://localhost:4000/api
```

## File: frontend/package.json
```json
{
  "name": "ruta-ecologica-frontend",
  "version": "1.0.0",
  "private": true,
  "dependencies": {
    "axios": "^1.7.7",
    "leaflet": "^1.9.4",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-leaflet": "^4.2.1",
    "react-scripts": "5.0.1"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },
  "eslintConfig": {
    "extends": ["react-app"]
  },
  "browserslist": {
    "production": [">0.2%", "not dead", "not op_mini all"],
    "development": ["last 1 chrome version", "last 1 firefox version", "last 1 safari version"]
  }
}
```

## File: backend/src/models/RutaHistorial.js
```javascript
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
```

## File: backend/src/routes/rutas.routes.js
```javascript
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
```

## File: backend/src/utils/co2Calculator.js
```javascript
/**
 * Cálculo de emisiones de CO2 por trayecto (Unidad 2).
 *
 * Tracción (idéntico a Unidad 1):
 *   emisiones = distanciaKm * FACTOR_BASE * (1 + factorRiesgoCarretera * 0.4)
 *
 * Refrigeración (solo si el perfil del producto la requiere), proporcional a la DURACIÓN:
 *   emisionesFrio = (duracionMin / 60) * kgCO2PorHoraDelEquipo
 *
 * El consumo del equipo de frío es del VEHÍCULO, no del producto. Orden de resolución:
 *   1. opción `co2RefrigeracionKgHora`  2. env CO2_REFRIGERACION_KG_H  3. default de abajo.
 */

// 2.68 es kg de CO2 por LITRO de diésel (no por hora).
const FACTOR_DIESEL_KG_CO2_POR_LITRO = 2.68;
// SUPUESTO sin fuente (equipos de frío de carga liviana: orden de 1–3 L/h). El equipo debe validarlo.
const CONSUMO_REFRIGERACION_LITROS_HORA = 2;
const CO2_REFRIGERACION_KG_H_DEFAULT = FACTOR_DIESEL_KG_CO2_POR_LITRO * CONSUMO_REFRIGERACION_LITROS_HORA; // 5.36

function resolverCo2Refrigeracion(override) {
  const crudo = override != null ? override : process.env.CO2_REFRIGERACION_KG_H;
  if (crudo === undefined || crudo === null || crudo === '') return CO2_REFRIGERACION_KG_H_DEFAULT;
  const valor = Number(crudo);
  if (!Number.isFinite(valor) || valor < 0) {
    throw new Error(`CO2_REFRIGERACION_KG_H inválido: "${crudo}" (se espera un número >= 0)`);
  }
  return valor; // 0 es un valor legítimo (no cae al default)
}

function calcularEmisionesCO2({
  distanciaKm,
  factorRiesgoCarretera = 0.3,
  factorBase,
  duracionMin,
  requiereRefrigeracion = false,
  co2RefrigeracionKgHora,
}) {
  const FACTOR_BASE = factorBase || Number(process.env.CO2_EMISSION_FACTOR_KG_KM) || 0.9;

  // Penalización de hasta +40% por mal estado de la vía
  const factorAjustado = FACTOR_BASE * (1 + factorRiesgoCarretera * 0.4);
  let emisionesKg = distanciaKm * factorAjustado;

  if (requiereRefrigeracion) {
    // Sin duración no se puede costear el frío: fallar, no asumir 0.
    if (!Number.isFinite(duracionMin) || duracionMin < 0) {
      throw new Error('calcularEmisionesCO2: con requiereRefrigeracion=true, duracionMin es obligatorio (>= 0)');
    }
    emisionesKg += (duracionMin / 60) * resolverCo2Refrigeracion(co2RefrigeracionKgHora);
  }

  return Number(emisionesKg.toFixed(2));
}

module.exports = { calcularEmisionesCO2 };
```

## File: backend/src/utils/deteriorationRisk.js
```javascript
/**
 * Cálculo de riesgo de deterioro multiproducto (Unidad 2).
 *
 * Cada factor se normaliza a [0, 1] con las bandas del perfil y se pondera con
 * `pesosDeterioro`. Agnóstico al producto: el perfil lo inyecta el orquestador.
 *
 * Bandas (ver models/ProductoAgricola.js):
 *   - Lado superior (obligatorio): riesgo 0 hasta `optimaMax`, 1 desde `criticaMax`.
 *   - Lado inferior (opcional):    riesgo 0 desde `optimaMin`, 1 desde `criticaMin`.
 *
 * Un perfil inválido LANZA ERROR. Nunca se devuelve "riesgo 0" como valor de escape:
 * para un producto perecedero, 0 es la respuesta más peligrosa que se puede dar.
 */

/**
 * @typedef {Object} Condiciones
 * @property {number} duracionMin           Duración total del trayecto (min).
 * @property {number} temperatura           Temperatura ambiente (°C).
 * @property {number} humedad               Humedad relativa (%).
 * @property {number} lluviaMm              Intensidad de lluvia (mm/h). Es la misma unidad que
 *                                          `lluviaCriticaMmH` y que devuelve weatherService (rain['1h']).
 * @property {number} factorRiesgoCarretera Riesgo físico de la vía [0, 1].
 * @property {number} variacionAltitud      Desnivel a lo largo de la ruta (m).
 */

const CONDICIONES = ['duracionMin', 'temperatura', 'humedad', 'lluviaMm', 'factorRiesgoCarretera', 'variacionAltitud'];

function calcularDesgloseRiesgo(condiciones, perfilProducto) {
  if (!perfilProducto) {
    throw new Error('calcularRiesgoDeterioro: se requiere perfilProducto (ver data/productos/cafe.js)');
  }
  // Un NaN en UNA ruta contamina el min-max de TODAS las rutas de la consulta.
  for (const k of CONDICIONES) {
    if (!Number.isFinite(condiciones[k])) {
      throw new Error(`calcularRiesgoDeterioro: condición "${k}" no es un número finito (${condiciones[k]})`);
    }
  }

  const { duracionMin, temperatura, humedad, lluviaMm, factorRiesgoCarretera, variacionAltitud } = condiciones;
  const {
    vidaUtilHoras, sensibilidadTermica, sensibilidadHumedad, lluviaCriticaMmH,
    toleranciaFisica, variacionAltitudCriticaM, pesosDeterioro,
  } = perfilProducto;

  const tiempoNorm      = normalizarAscendente(duracionMin, 0, vidaUtilHoras * 60, 'vidaUtilHoras');
  const temperaturaNorm = riesgoBanda(temperatura, sensibilidadTermica, 'sensibilidadTermica');
  const humedadNorm     = riesgoBanda(humedad, sensibilidadHumedad, 'sensibilidadHumedad');
  const lluviaNorm      = normalizarAscendente(lluviaMm, 0, lluviaCriticaMmH, 'lluviaCriticaMmH');
  // Semántica de toleranciaFisica: fracción del factor de vía que se tolera sin daño.
  const carreteraNorm   = normalizarAscendente(factorRiesgoCarretera, toleranciaFisica, 1, 'toleranciaFisica');
  const altitudNorm     = normalizarAscendente(variacionAltitud, 0, variacionAltitudCriticaM, 'variacionAltitudCriticaM');

  // Mismo orden de operaciones que la Unidad 1 -> paridad bit-a-bit para el perfil de café.
  const penalizaciones = {
    tiempo:      tiempoNorm      * pesosDeterioro.tiempo,
    temperatura: temperaturaNorm * pesosDeterioro.temperatura,
    humedad:     humedadNorm     * pesosDeterioro.humedad,
    lluvia:      lluviaNorm      * pesosDeterioro.lluvia,
    carretera:   carreteraNorm   * pesosDeterioro.carretera,
    altitud:     altitudNorm     * pesosDeterioro.altitud,
  };

  const riesgoTotal =
    penalizaciones.tiempo +
    penalizaciones.temperatura +
    penalizaciones.humedad +
    penalizaciones.lluvia +
    penalizaciones.carretera +
    penalizaciones.altitud;

  return { riesgo: Number((riesgoTotal * 100).toFixed(1)), penalizaciones };
}

function calcularRiesgoDeterioro(condiciones, perfilProducto) {
  return calcularDesgloseRiesgo(condiciones, perfilProducto).riesgo;
}

/** Riesgo [0,1] de una banda: lado superior siempre; lado inferior solo si el perfil lo declara. */
function riesgoBanda(valor, banda, factor) {
  const superior = normalizarAscendente(valor, banda.optimaMax, banda.criticaMax, `${factor}.superior`);
  if (banda.criticaMin == null) return superior; // sin lado frío/seco (p. ej. café)
  const inferior = normalizarDescendente(valor, banda.optimaMin, banda.criticaMin, `${factor}.inferior`);
  return Math.max(superior, inferior); // solo uno de los dos lados puede ser > 0
}

/** 0 en `optimo`, 1 en `critico`, creciente. Exige critico > optimo. */
function normalizarAscendente(valor, optimo, critico, factor) {
  if (!(critico > optimo)) {
    throw new Error(`Perfil inválido (${factor}): el límite crítico (${critico}) debe ser mayor que el óptimo (${optimo})`);
  }
  return clamp((valor - optimo) / (critico - optimo), 0, 1);
}

/** 0 en `optimo`, 1 en `critico`, decreciente. Exige critico < optimo. */
function normalizarDescendente(valor, optimo, critico, factor) {
  if (!(critico < optimo)) {
    throw new Error(`Perfil inválido (${factor}): el límite crítico (${critico}) debe ser menor que el óptimo (${optimo})`);
  }
  return clamp((optimo - valor) / (optimo - critico), 0, 1);
}

function clamp(valor, min, max) {
  return Math.min(Math.max(valor, min), max);
}

module.exports = { calcularRiesgoDeterioro, calcularDesgloseRiesgo };
```

## File: backend/package.json
```json
{
  "name": "ruta-ecologica-backend",
  "version": "1.0.0",
  "description": "API para determinar la ruta ecológica más adecuada para transportar pulpa de café",
  "main": "server.js",
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js",
    "test": "node --test"
  },
  "dependencies": {
    "axios": "^1.7.7",
    "cors": "^2.8.5",
    "dotenv": "^16.4.5",
    "express": "^4.22.3",
    "mongoose": "^8.24.8"
  },
  "devDependencies": {
    "nodemon": "^3.1.4"
  }
}
```

## File: backend/server.js
```javascript
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./src/config/db');

const fincasRoutes = require('./src/routes/fincas.routes');
const plantasRoutes = require('./src/routes/plantas.routes');
const rutasRoutes = require('./src/routes/rutas.routes');
const ordenamientoRoutes = require('./src/routes/ordenamiento.routes');

const app = express();

// Middlewares
app.use(cors({ origin: process.env.FRONTEND_URL || '*' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Conexión a la base de datos (no bloquea el arranque si falla, solo avisa)
connectDB();

// Rutas de la API
app.use('/api/fincas', fincasRoutes);
app.use('/api/plantas', plantasRoutes);
app.use('/api/rutas', rutasRoutes);
app.use('/api/ordenamiento', ordenamientoRoutes);

// Endpoint de salud
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', servicio: 'Ruta Ecológica Café API', fecha: new Date().toISOString() });
});

// Manejo de errores centralizado
app.use((err, req, res, next) => {
  console.error('Error no controlado:', err);
  res.status(err.status || 500).json({
    error: true,
    mensaje: err.message || 'Error interno del servidor',
  });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚚☕ Servidor de Ruta Ecológica Café escuchando en el puerto ${PORT}`);
});
```

## File: frontend/src/api/api.js
```javascript
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:4000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

// Fincas
export const listarFincas = () => api.get('/fincas').then((r) => r.data);
export const crearFinca = (finca) => api.post('/fincas', finca).then((r) => r.data);
export const eliminarFinca = (id) => api.delete(`/fincas/${id}`).then((r) => r.data);

// Plantas de procesamiento
export const listarPlantas = () => api.get('/plantas').then((r) => r.data);
export const crearPlanta = (planta) => api.post('/plantas', planta).then((r) => r.data);
export const eliminarPlanta = (id) => api.delete(`/plantas/${id}`).then((r) => r.data);

// Evaluación de rutas
// NOTA: el backend lee `productoSlug` (no `producto`); si se omite, cae a 'cafe'.
export const evaluarRutas = (origen, destino, fincaId, plantaId, productoSlug = 'cafe') =>
  api.post('/rutas/evaluar', {
    origen,
    destino,
    fincaId,
    plantaId,
    productoSlug,
  }).then((r) => r.data);

export const evaluarRutasPorIds = (fincaId, plantaId, productoSlug = 'cafe') =>
  api.post('/rutas/evaluar-por-ids', {
    fincaId,
    plantaId,
    productoSlug,
  }).then((r) => r.data);

export const obtenerHistorial = () => api.get('/rutas/historial').then((r) => r.data);

export default api;
```

## File: frontend/src/App.js
```javascript
import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import MapSelector from './components/MapSelector';
import RouteResults from './components/RouteResults';
import FincaForm from './components/FincaForm';
import PlantaForm from './components/PlantaForm';
import { listarFincas, listarPlantas, evaluarRutas, evaluarRutasPorIds } from './api/api';
import { obtenerRutaPorCriterio } from './utils/criterios';

const TABS = {
  EVALUAR: 'evaluar',
  FINCAS: 'fincas',
  PLANTAS: 'plantas',
};

export default function App() {
  const [tabActiva, setTabActiva] = useState(TABS.EVALUAR);

  const [origen, setOrigen] = useState(null);
  const [destino, setDestino] = useState(null);

  const [fincas, setFincas] = useState([]);
  const [plantas, setPlantas] = useState([]);
  const [fincaSeleccionada, setFincaSeleccionada] = useState('');
  const [plantaSeleccionada, setPlantaSeleccionada] = useState('');
  const [productoSeleccionado, setProductoSeleccionado] = useState('cafe');

  const [resultado, setResultado] = useState(null);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(null);
  const [rutaSeleccionadaId, setRutaSeleccionadaId] = useState(null);
  const [criterioActivo, setCriterioActivo] = useState('ecologico');

  useEffect(() => {
    cargarListas();
  }, []);

  const cargarListas = async () => {
    try {
      const [f, p] = await Promise.all([listarFincas(), listarPlantas()]);
      setFincas(f);
      setPlantas(p);
    } catch (e) {
      console.warn('No se pudieron cargar fincas/plantas (¿backend/BD activo?):', e.message);
    }
  };

  const handleSeleccionMapa = ({ origen: o, destino: d }) => {
    setOrigen(o);
    setDestino(d);
    setResultado(null);
    setRutaSeleccionadaId(null);
    setCriterioActivo('ecologico');
  };

  const handleSeleccionarRuta = (rutaId) => {
    setRutaSeleccionadaId(rutaId);
    setCriterioActivo(null); // selección manual (clic en mapa o tabla): ningún criterio predefinido activo
  };

  const handleSeleccionarCriterio = (criterioKey) => {
    if (!resultado) return;
    if (criterioKey === 'ecologico') {
      setRutaSeleccionadaId(resultado.rutaRecomendada.id);
    } else {
      const ganadora = obtenerRutaPorCriterio(resultado.rutasEvaluadas, criterioKey);
      if (ganadora) setRutaSeleccionadaId(ganadora.id);
    }
    setCriterioActivo(criterioKey);
  };

  const handleEvaluarPorMapa = async () => {
    if (!origen || !destino) {
      setError('Selecciona un origen y un destino en el mapa (o ingresa coordenadas manualmente).');
      return;
    }
    setError(null);
    setCargando(true);
    setResultado(null);
    try {
      const data = await evaluarRutas(origen, destino, null, null, productoSeleccionado);
      setResultado(data);
      setRutaSeleccionadaId(data?.rutaRecomendada?.id ?? null);
      setCriterioActivo('ecologico');
    } catch (e) {
      setError('Error evaluando rutas: ' + (e.response?.data?.mensaje || e.message));
    } finally {
      setCargando(false);
    }
  };

  const handleEvaluarPorFincaPlanta = async () => {
    if (!fincaSeleccionada || !plantaSeleccionada) {
      setError('Selecciona una finca y una planta registradas.');
      return;
    }
    setError(null);
    setCargando(true);
    setResultado(null);
    try {
      const data = await evaluarRutasPorIds(
        fincaSeleccionada,
        plantaSeleccionada,
        productoSeleccionado
      );
      setResultado(data);
      setRutaSeleccionadaId(data?.rutaRecomendada?.id ?? null);
      setCriterioActivo('ecologico');
    } catch (e) {
      setError('Error evaluando rutas: ' + (e.response?.data?.mensaje || e.message));
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="app-container">
      <Header />

      <div className="tabs">
        <div
          className={`tab ${tabActiva === TABS.EVALUAR ? 'active' : ''}`}
          onClick={() => setTabActiva(TABS.EVALUAR)}
        >
          🗺️ Evaluar ruta
        </div>
        <div
          className={`tab ${tabActiva === TABS.FINCAS ? 'active' : ''}`}
          onClick={() => setTabActiva(TABS.FINCAS)}
        >
          🏡 Fincas
        </div>
        <div
          className={`tab ${tabActiva === TABS.PLANTAS ? 'active' : ''}`}
          onClick={() => setTabActiva(TABS.PLANTAS)}
        >
          🏭 Plantas
        </div>
      </div>

      {tabActiva === TABS.EVALUAR && (
        <>
        <div className="card">
          <h2>Producto que se transportará</h2>

          <select
            value={productoSeleccionado}
            onChange={(e) => setProductoSeleccionado(e.target.value)}
          >
            <option value="cafe">Pulpa de café</option>
            <option value="banano">Banano</option>
          </select>
        </div>
        
          <div className="card">
            <h2>Opción 1: Seleccionar en el mapa</h2>
            <MapSelector
              origen={origen}
              destino={destino}
              onSeleccionar={handleSeleccionMapa}
              rutas={resultado?.rutasEvaluadas || []}
              rutaRecomendadaId={resultado?.rutaRecomendada?.id ?? null}
              rutaSeleccionadaId={rutaSeleccionadaId}
              onSeleccionarRuta={handleSeleccionarRuta}
            />
            <div style={{ marginTop: 12 }}>
              <p>
                Origen: {origen ? `${origen.lat.toFixed(5)}, ${origen.lng.toFixed(5)}` : 'no seleccionado'}
                {'  |  '}
                Destino: {destino ? `${destino.lat.toFixed(5)}, ${destino.lng.toFixed(5)}` : 'no seleccionado'}
              </p>
              <button onClick={handleEvaluarPorMapa} disabled={cargando}>
                {cargando ? 'Calculando ruta ecológica...' : 'Calcular ruta más ecológica'}
              </button>
            </div>
          </div>

          <div className="card">
            <h2>Opción 2: Usar finca y planta registradas</h2>
            <div className="grid-2">
              <div>
                <label>Finca de origen</label>
                <select value={fincaSeleccionada} onChange={(e) => setFincaSeleccionada(e.target.value)}>
                  <option value="">-- Selecciona una finca --</option>
                  {fincas.map((f) => (
                    <option key={f._id} value={f._id}>
                      {f.nombre}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label>Planta de destino</label>
                <select value={plantaSeleccionada} onChange={(e) => setPlantaSeleccionada(e.target.value)}>
                  <option value="">-- Selecciona una planta --</option>
                  {plantas.map((p) => (
                    <option key={p._id} value={p._id}>
                      {p.nombre}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <button onClick={handleEvaluarPorFincaPlanta} disabled={cargando}>
              {cargando ? 'Calculando ruta ecológica...' : 'Calcular ruta más ecológica'}
            </button>
          </div>

          {error && (
            <div className="card" style={{ background: '#fdecea', color: '#b03a2e' }}>
              {error}
            </div>
          )}

          <RouteResults
            resultado={resultado}
            rutaSeleccionadaId={rutaSeleccionadaId}
            onSeleccionarRuta={handleSeleccionarRuta}
            criterioActivo={criterioActivo}
            onSeleccionarCriterio={handleSeleccionarCriterio}
          />
        </>
      )}

      {tabActiva === TABS.FINCAS && (
        <FincaForm
          puntoSeleccionado={origen}
          onCreada={(nueva) => setFincas((prev) => [nueva, ...prev])}
        />
      )}

      {tabActiva === TABS.PLANTAS && (
        <PlantaForm
          puntoSeleccionado={destino}
          onCreada={(nueva) => setPlantas((prev) => [nueva, ...prev])}
        />
      )}
    </div>
  );
}
```

## File: .gitignore
```
node_modules/
.env
build/
dist/
.DS_Store
npm-debug.log*
local/
```

## File: backend/src/services/optimizacionService.js
```javascript
const { obtenerRutasAlternativas } = require('./osrmService');
const { obtenerAltitudes } = require('./elevationService');
const { obtenerClimaPromedioRuta } = require('./weatherService');
const { evaluarEstadoCarretera } = require('./roadConditionService');
const { calcularEmisionesCO2 } = require('../utils/co2Calculator');
const { calcularRiesgoDeterioro } = require('../utils/deteriorationRisk');
const { mergeSort, crearComparador } = require('../utils/ordenamiento');
const { MinHeap } = require('../utils/heap');

/**
 * Pesos usados para combinar los factores normalizados en el "puntaje ecológico".
 * Puntaje MÁS BAJO = ruta MÁS recomendable (es un índice de "costo ecológico/logístico").
 * Todos los pesos suman 1.0 y pueden ajustarse según prioridades del negocio.
 */
const PESOS = {
  distancia: 0.15,
  tiempo: 0.15,
  emisionesCO2: 0.25,
  riesgoDeterioro: 0.3,
  estadoCarretera: 0.1,
  variacionAltitud: 0.05,
};

/**
 * Criterio de ordenamiento del ranking ecológico (multicriterio).
 * Se usa tanto en MergeSort (lista completa) como en MinHeap.topK (Top-3).
 */
const CRITERIOS_RANKING = 'puntajeEcologico:asc,riesgoDeterioro:asc,distanciaKm:asc';

/**
 * Evalúa todas las rutas alternativas entre origen y destino, calcula sus
 * indicadores (clima, altitud, CO2, riesgo de deterioro, estado de la vía)
 * y determina cuál es la más ecológica.
 *
 * @param {{lat:number,lng:number}} origen
 * @param {{lat:number,lng:number}} destino
 * @param {Object} perfilProducto  Perfil del producto (ver data/productos/cafe.js).
 *                                 OBLIGATORIO: el controller debe inyectarlo.
 */
async function evaluarRutas(origen, destino, perfilProducto) {
  if (!perfilProducto) {
    throw new Error('evaluarRutas: se requiere perfilProducto (ver productoService.cargarPerfil)');
  }

  const rutas = await obtenerRutasAlternativas(origen, destino);
  // Pesos por producto (opcional). Si el perfil no los declara, se usan los globales.
  const pesos = perfilProducto.pesosOptimizacion ?? PESOS;

  const rutasEvaluadas = await Promise.all(
    rutas.map((ruta) => evaluarRutaIndividual(ruta, perfilProducto))
  );

  // Normalización min-max de cada indicador para poder combinarlos en un solo puntaje
  const normalizados = normalizarIndicadores(rutasEvaluadas);

  const rutasConPuntaje = rutasEvaluadas.map((ruta, i) => {
    const n = normalizados[i];
    const puntajeEcologico =
      n.distancia * pesos.distancia +
      n.tiempo * pesos.tiempo +
      n.emisionesCO2 * pesos.emisionesCO2 +
      n.riesgoDeterioro * pesos.riesgoDeterioro +
      n.estadoCarretera * pesos.estadoCarretera +
      n.variacionAltitud * pesos.variacionAltitud;

    return { ...ruta, puntajeEcologico: Number((puntajeEcologico * 100).toFixed(2)) };
  });

  // MergeSort propio (estable) → preserva compatibilidad bit-a-bit con U1
  // cuando dos rutas empatan en los tres criterios.
  const compararCompleto = crearComparador(CRITERIOS_RANKING);
  const rutasOrdenadas = mergeSort(rutasConPuntaje, compararCompleto);

  // MinHeap.topK → obtiene las 3 mejores en O(n log 3) ≈ O(n),
  // sin ordenar el arreglo completo. Se expone como `top3` para el frontend
  // y como demostración del módulo de Heaps del Avance 3.
  const top3 = rutasOrdenadas.slice(0, 3);

  return {
    rutasEvaluadas: rutasOrdenadas,
    rutaRecomendada: rutasOrdenadas[0],
    top3,
    // Snapshot del producto usado (para que el histórico sea interpretable aunque
    // los perfiles cambien con el tiempo)
    producto: {
      slug: perfilProducto.slug,
      nombre: perfilProducto.nombre,
      version: perfilProducto.version ?? 1,
    },
  };
}

/**
 * Evalúa una sola ruta: clima, altitud, estado de vía, CO2 y riesgo de deterioro.
 *
 * @param {Object} ruta
 * @param {Object} perfilProducto
 */
async function evaluarRutaIndividual(ruta, perfilProducto) {
  const [clima, altitudes] = await Promise.all([
    obtenerClimaPromedioRuta(ruta.puntosMuestra),
    obtenerAltitudes(ruta.puntosMuestra),
  ]);

  const altitudPromedio = promedio(altitudes);
  const variacionAltitud = Math.max(...altitudes) - Math.min(...altitudes);

  const { estado: estadoCarretera, factorRiesgo: factorRiesgoCarretera } =
    evaluarEstadoCarretera(ruta);

  // Fix del bug de CO2: duracionMin y requiereRefrigeracion son obligatorios
  // cuando el perfil exige refrigeración. Se pasan SIEMPRE los dos juntos.
  const emisionesCO2Kg = calcularEmisionesCO2({
    distanciaKm: ruta.distanciaKm,
    factorRiesgoCarretera,
    duracionMin: ruta.duracionMin,
    requiereRefrigeracion: perfilProducto.requiereRefrigeracion,
  });

  // U2: calcularRiesgoDeterioro exige el segundo argumento (perfil)
  const riesgoDeterioro = calcularRiesgoDeterioro(
    {
      duracionMin: ruta.duracionMin,
      temperatura: clima.temperatura,
      humedad: clima.humedad,
      lluviaMm: clima.lluviaMm,
      factorRiesgoCarretera,
      variacionAltitud,
    },
    perfilProducto
  );

  return {
    id: ruta.id,
    resumen: ruta.resumen,
    distanciaKm: ruta.distanciaKm,
    duracionMin: ruta.duracionMin,
    polyline: ruta.polyline,
    puntosMuestra: ruta.puntosMuestra,
    altitudPromedio: Number(altitudPromedio.toFixed(1)),
    variacionAltitud: Number(variacionAltitud.toFixed(1)),
    clima,
    estadoCarretera,
    factorRiesgoCarretera,
    riesgoDeterioro,
    emisionesCO2Kg,
  };
}

/** Normaliza cada indicador de la lista de rutas a una escala 0-1 (min-max) */
function normalizarIndicadores(rutas) {
  const campos = ['distanciaKm', 'duracionMin', 'emisionesCO2Kg', 'riesgoDeterioro', 'factorRiesgoCarretera', 'variacionAltitud'];
  const mapaClaves = {
    distanciaKm: 'distancia',
    duracionMin: 'tiempo',
    emisionesCO2Kg: 'emisionesCO2',
    riesgoDeterioro: 'riesgoDeterioro',
    factorRiesgoCarretera: 'estadoCarretera',
    variacionAltitud: 'variacionAltitud',
  };

  const minMax = {};
  campos.forEach((campo) => {
    const valores = rutas.map((r) => r[campo]);
    minMax[campo] = { min: Math.min(...valores), max: Math.max(...valores) };
  });

  return rutas.map((ruta) => {
    const normalizado = {};
    campos.forEach((campo) => {
      const { min, max } = minMax[campo];
      const clave = mapaClaves[campo];
      normalizado[clave] = max === min ? 0 : (ruta[campo] - min) / (max - min);
    });
    return normalizado;
  });
}

function promedio(lista) {
  return lista.reduce((a, b) => a + b, 0) / lista.length;
}

module.exports = { evaluarRutas, PESOS };
```

## File: frontend/src/utils/polyline.js
```javascript
/**
 * Decodifica una polyline codificada (formato de Google Maps) a un arreglo de {lat, lng}.
 * Referencia del algoritmo: https://developers.google.com/maps/documentation/utilities/polylinealgorithm
 */
export function decodificarPolyline(encoded) {
  if (!encoded) return [];

  let index = 0;
  let lat = 0;
  let lng = 0;
  const puntos = [];

  while (index < encoded.length) {
    let b;
    let shift = 0;
    let result = 0;
    do {
      b = encoded.charCodeAt(index++) - 63;
      result |= (b & 0x1f) << shift;
      shift += 5;
    } while (b >= 0x20);
    const dlat = result & 1 ? ~(result >> 1) : result >> 1;
    lat += dlat;

    shift = 0;
    result = 0;
    do {
      b = encoded.charCodeAt(index++) - 63;
      result |= (b & 0x1f) << shift;
      shift += 5;
    } while (b >= 0x20);
    const dlng = result & 1 ? ~(result >> 1) : result >> 1;
    lng += dlng;

    puntos.push({ lat: lat / 1e5, lng: lng / 1e5 });
  }

  return puntos;
}
```

## File: README.md
```markdown
#  Ruta Ecológica para Transporte de Pulpa de Café

## Problemática

La pulpa de café es el residuo orgánico que queda al despulpar el grano, y es **altamente
perecedera**: comienza a fermentarse y descomponerse pocas horas después de generarse en la
finca. Entre una finca cafetera y una planta de procesamiento suelen existir **varias vías
posibles**, y hoy esa elección se hace de forma empírica ("por experiencia sé que esa vía es
mala"), sin considerar de manera objetiva factores como el clima, el estado real de la carretera
o las emisiones generadas en el trayecto.

Esto genera tres problemas concretos:

- **Pérdida de producto**: si la ruta elegida toma demasiado tiempo o atraviesa condiciones de
  calor/humedad altas, la pulpa se fermenta antes de llegar, perdiendo valor o volviéndose
  inutilizable.
- **Mayor huella ambiental**: una vía en mal estado implica más frenados, aceleraciones y consumo
  de combustible, aumentando las emisiones de CO₂ del transporte.
- **Decisiones no repetibles**: cada conductor o transportista decide "a ojo", sin un criterio
  estandarizado que pueda auditarse o mejorarse con datos.

**La aplicación resuelve esto automatizando la decisión**: dado un origen (finca) y un destino
(planta), calcula varias rutas reales alternativas y las evalúa por distancia, tiempo, clima,
altitud y estado de la vía, combinando todo en un puntaje ecológico objetivo — reemplazando la
intuición por un cálculo repetible y explicable.

## 📸 Capturas de pantalla

### 1. Selección de origen y destino en el mapa
<img width="1856" height="1020" alt="Captura de pantalla 2026-07-29 222041" src="https://github.com/user-attachments/assets/5324d7e9-8cd7-4006-9d7d-563c79b78222" />

El punto de partida de la aplicación: un mapa interactivo donde el usuario marca la **finca**
(primer clic) y la **planta de procesamiento** (segundo clic). En este ejemplo ya se calcularon
las rutas entre Guayaquil y Riobamba: se ven **las dos rutas alternativas dibujadas al mismo
tiempo** — la recomendada en **verde y más gruesa** (Ruta 1, vía Calle Rural) y la alternativa en
**naranja** (Ruta 2, vía Panamericana Sur). Debajo del mapa, la leyenda con botones permite
seleccionar cualquiera de las dos directamente, y las coordenadas exactas de origen/destino
quedan visibles al final.

### 2. Resultado de la evaluación

<img width="1919" height="1020" alt="Captura de pantalla 2026-07-29 222114" src="https://github.com/user-attachments/assets/d64d0e66-5a9e-4d36-b993-d3912958c0d5" />


Apenas termina el cálculo, se muestra de inmediato la tarjeta de la **ruta recomendada** (marcada
con 🏆), con sus indicadores principales: distancia, duración, clima del trayecto (temperatura y
humedad promedio) y las emisiones de CO₂ estimadas. La etiqueta verde **BUENO** indica el estado
inferido de la vía.

Ademas aquí se ve la tarjeta de la ruta recomendada ya completa (incluyendo altitud promedio y riesgo de
deterioro de la pulpa), y justo debajo el **selector de criterios individuales**: además del
puntaje ecológico combinado, el usuario puede pedir directamente cuál ruta es mejor por
**menor distancia**, **menor tiempo**, **menor CO₂** o **menor riesgo** — sin volver a calcular
nada, ya que todos los indicadores de todas las rutas viajaron en la respuesta original. Al
elegir un criterio, la ruta ganadora de ese parámetro se resalta también en el mapa.

### 4. Panel comparativo de rutas

<img width="1919" height="1020" alt="Captura de pantalla 2026-07-29 222136" src="https://github.com/user-attachments/assets/da9be75c-63a0-4e2d-b78a-8db02221d741" />


La tabla comparativa reúne **todas** las rutas evaluadas en una sola vista, columna por columna:
distancia, duración, altitud promedio, CO₂, riesgo de deterioro, estado de la vía y el puntaje
ecológico final. Cualquier fila es clicable para verla en detalle (nótese el aviso "Seleccionada
manualmente" en la tarjeta de abajo, que indica que la ruta activa no fue elegida por ningún
criterio predefinido sino por un clic directo en la fila o en el mapa).

### 5. Detalle de todas las rutas evaluadas

<img width="1919" height="1019" alt="Captura de pantalla 2026-07-29 222146" src="https://github.com/user-attachments/assets/57741af3-29d2-4f05-bdef-6e18ffd77072" />


Al final de la página, cada ruta evaluada se muestra como una tarjeta independiente con todos sus
indicadores completos — útil para comparar en detalle sin tener que interpretar solo la tabla
resumida. La ruta recomendada mantiene su borde e ícono 🏆 distintivo incluso aquí, para que
siempre quede claro cuál ganó el puntaje ecológico combinado, sin importar qué tan abajo se
desplace la página.
```
