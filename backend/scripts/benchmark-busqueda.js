/**
 * Benchmark: búsqueda secuencial vs binaria, en memoria y en archivo binario.
 *
 * Uso:  node backend/scripts/benchmark-busqueda.js
 *
 * Genera 3 datasets sintéticos (1 000, 50 000, 500 000 registros), ejecuta
 * N consultas aleatorias sobre cada uno, y mide tiempo y comparaciones con
 * performance.now() en Node.js.
 *
 * Salidas:
 *   - Tabla comparativa en consola
 *   - resultados-benchmark-busqueda.json (para el informe)
 *   - grafico-busqueda-memoria.svg y grafico-busqueda-archivo.svg
 */
const fs = require('fs');
const path = require('path');
const { performance } = require('perf_hooks');

const { busquedaSecuencial, busquedaBinaria } = require('../src/utils/busqueda');
const { mergeSort, crearComparador } = require('../src/utils/ordenamiento');

// ---------------------------------------------------------------------------
// Configuración
// ---------------------------------------------------------------------------
const TAMANOS = [1000, 50000, 500000];
const CONSULTAS_MEMORIA = 500; // consultas aleatorias por tamaño, en memoria
const CONSULTAS_ARCHIVO = 50;  // menos para no tardar minutos en n=500k

const RECORD_SIZE = 64;        // bytes por registro en el archivo binario
const CHUNK_REGISTROS = 64;    // lectura por bloques para secuencial en archivo
const DIR_TMP = path.join(__dirname, '.benchmark-tmp');

// ---------------------------------------------------------------------------
// Generación del dataset (id consecutivo 1..n, ya "pre-ordenado")
// ---------------------------------------------------------------------------
function generarRegistros(n) {
  const registros = new Array(n);
  for (let i = 0; i < n; i++) {
    registros[i] = {
      id: i + 1,
      riesgo: Math.random() * 100,
      emisionesCO2Kg: Math.random() * 200,
      distanciaKm: Math.random() * 300,
      puntajeEcologico: Math.random() * 100,
    };
  }
  return registros;
}

// ---------------------------------------------------------------------------
// Archivo binario de registros de tamaño fijo
// Layout (64 bytes):
//   [0..3]   id (int32 LE)
//   [4..11]  riesgo (float64 LE)
//   [12..19] emisionesCO2Kg (float64 LE)
//   [20..27] distanciaKm (float64 LE)
//   [28..35] puntajeEcologico (float64 LE)
//   [36..63] padding
// ---------------------------------------------------------------------------
function escribirArchivo(registros, ruta) {
  const buf = Buffer.alloc(registros.length * RECORD_SIZE);
  for (let i = 0; i < registros.length; i++) {
    const off = i * RECORD_SIZE;
    buf.writeInt32LE(registros[i].id, off);
    buf.writeDoubleLE(registros[i].riesgo, off + 4);
    buf.writeDoubleLE(registros[i].emisionesCO2Kg, off + 12);
    buf.writeDoubleLE(registros[i].distanciaKm, off + 20);
    buf.writeDoubleLE(registros[i].puntajeEcologico, off + 28);
  }
  fs.writeFileSync(ruta, buf);
  return buf.length;
}

// ---------------------------------------------------------------------------
// Búsquedas sobre archivo
// ---------------------------------------------------------------------------
function busquedaSecuencialArchivo(fd, total, objetivo) {
  let comparaciones = 0;
  const buf = Buffer.alloc(CHUNK_REGISTROS * RECORD_SIZE);

  for (let chunk = 0; chunk < total; chunk += CHUNK_REGISTROS) {
    const cuantos = Math.min(CHUNK_REGISTROS, total - chunk);
    fs.readSync(fd, buf, 0, cuantos * RECORD_SIZE, chunk * RECORD_SIZE);
    for (let j = 0; j < cuantos; j++) {
      comparaciones++;
      if (buf.readInt32LE(j * RECORD_SIZE) === objetivo) {
        return { indice: chunk + j, comparaciones };
      }
    }
  }
  return { indice: -1, comparaciones };
}

function busquedaBinariaArchivo(fd, total, objetivo) {
  let comparaciones = 0;
  let inicio = 0;
  let fin = total - 1;
  const buf = Buffer.alloc(RECORD_SIZE);

  while (inicio <= fin) {
    const medio = (inicio + fin) >>> 1;
    comparaciones++;
    fs.readSync(fd, buf, 0, RECORD_SIZE, medio * RECORD_SIZE);
    const clave = buf.readInt32LE(0);
    if (clave === objetivo) return { indice: medio, comparaciones };
    if (clave < objetivo) inicio = medio + 1;
    else fin = medio - 1;
  }
  return { indice: -1, comparaciones };
}

// ---------------------------------------------------------------------------
// Medición
// ---------------------------------------------------------------------------
function medirPromedio(fn, consultas) {
  let totalMs = 0;
  let totalComp = 0;
  for (const q of consultas) {
    const t0 = performance.now();
    const r = fn(q);
    totalMs += performance.now() - t0;
    totalComp += r.comparaciones;
  }
  return {
    tiempoPromedioMs: totalMs / consultas.length,
    comparacionesPromedio: totalComp / consultas.length,
  };
}

/** Mitad de las consultas son de IDs existentes, mitad de IDs ausentes. */
function elegirConsultas(ordenados, cantidad, tamMax) {
  const consultas = [];
  for (let i = 0; i < cantidad; i++) {
    if (i % 2 === 0) consultas.push(ordenados[Math.floor(Math.random() * ordenados.length)].id);
    else consultas.push(tamMax + 1 + Math.floor(Math.random() * 1000));
  }
  return consultas;
}

// ---------------------------------------------------------------------------
// SVG minimalista (sin dependencias)
// ---------------------------------------------------------------------------
function escribirSVG(resultados, campoA, campoB, titulo, rutaArchivo) {
  const W = 800, H = 400, P = { top: 50, right: 160, bottom: 60, left: 100 };
  const pw = W - P.left - P.right, ph = H - P.top - P.bottom;

  const maxN = Math.max(...resultados.map((r) => r.n));
  const minN = Math.min(...resultados.map((r) => r.n));
  const xOf = (n) =>
    P.left + (pw * (Math.log10(n) - Math.log10(minN))) / (Math.log10(maxN) - Math.log10(minN));

  const tiempos = resultados.flatMap((r) => [r[campoA].tiempoPromedioMs, r[campoB].tiempoPromedioMs]);
  const maxT = Math.max(...tiempos);
  const minT = Math.max(1e-5, Math.min(...tiempos));
  const yOf = (t) =>
    P.top + ph - (ph * (Math.log10(t) - Math.log10(minT))) / (Math.log10(maxT) - Math.log10(minT));

  const pts = (campo) =>
    resultados.map((r) => `${xOf(r.n).toFixed(1)},${yOf(r[campo].tiempoPromedioMs).toFixed(1)}`).join(' ');

  const puntos = (campo, color) =>
    resultados
      .map(
        (r) =>
          `<circle cx="${xOf(r.n).toFixed(1)}" cy="${yOf(r[campo].tiempoPromedioMs).toFixed(1)}" r="4" fill="${color}"/>`
      )
      .join('');

  const etiquetasX = resultados
    .map(
      (r) =>
        `<text x="${xOf(r.n).toFixed(1)}" y="${H - P.bottom + 22}" text-anchor="middle" font-size="12">${r.n.toLocaleString('es')}</text>`
    )
    .join('');

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" font-family="sans-serif">
  <rect width="100%" height="100%" fill="white"/>
  <text x="${W / 2}" y="28" text-anchor="middle" font-size="16" font-weight="bold">${titulo}</text>
  <line x1="${P.left}" y1="${P.top}" x2="${P.left}" y2="${H - P.bottom}" stroke="black"/>
  <line x1="${P.left}" y1="${H - P.bottom}" x2="${W - P.right}" y2="${H - P.bottom}" stroke="black"/>
  <polyline points="${pts(campoA)}" fill="none" stroke="#e74c3c" stroke-width="2"/>
  <polyline points="${pts(campoB)}" fill="none" stroke="#2e7d32" stroke-width="2"/>
  ${puntos(campoA, '#e74c3c')}
  ${puntos(campoB, '#2e7d32')}
  ${etiquetasX}
  <text x="${P.left - 12}" y="${P.top}" text-anchor="end" font-size="11">${maxT.toFixed(2)} ms</text>
  <text x="${P.left - 12}" y="${H - P.bottom}" text-anchor="end" font-size="11">${minT.toFixed(4)} ms</text>
  <text x="${W / 2}" y="${H - 12}" text-anchor="middle" font-size="12">Número de registros (escala log)</text>
  <g transform="translate(${W - P.right + 10}, ${P.top + 10})">
    <line x1="0" y1="0" x2="20" y2="0" stroke="#e74c3c" stroke-width="2"/>
    <text x="25" y="4" font-size="12">Secuencial</text>
    <line x1="0" y1="22" x2="20" y2="22" stroke="#2e7d32" stroke-width="2"/>
    <text x="25" y="26" font-size="12">Binaria</text>
  </g>
</svg>`;
  fs.writeFileSync(rutaArchivo, svg);
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------
function main() {
  if (!fs.existsSync(DIR_TMP)) fs.mkdirSync(DIR_TMP, { recursive: true });

  const comparar = crearComparador([{ campo: 'id', orden: 'asc' }]);
  const resultados = [];

  for (const n of TAMANOS) {
    console.log(`\n▶ n = ${n.toLocaleString('es')}`);
    const registros = generarRegistros(n);
    // Ordena con el mergeSort del proyecto (reutiliza el módulo de ordenamiento)
    const ordenados = mergeSort(registros, comparar);

    const consultasMem = elegirConsultas(ordenados, CONSULTAS_MEMORIA, n);
    const consultasArc = elegirConsultas(ordenados, CONSULTAS_ARCHIVO, n);

    const secMem = medirPromedio((q) => busquedaSecuencial(ordenados, q), consultasMem);
    const binMem = medirPromedio((q) => busquedaBinaria(ordenados, q), consultasMem);

    const archivo = path.join(DIR_TMP, `registros_${n}.bin`);
    const bytesArchivo = escribirArchivo(ordenados, archivo);
    const fd = fs.openSync(archivo, 'r');

    const secArc = medirPromedio((q) => busquedaSecuencialArchivo(fd, n, q), consultasArc);
    const binArc = medirPromedio((q) => busquedaBinariaArchivo(fd, n, q), consultasArc);

    fs.closeSync(fd);
    fs.unlinkSync(archivo);

    resultados.push({
      n,
      bytesArchivo,
      secMem,
      binMem,
      secArc,
      binArc,
      ratioTiempoMem: secMem.tiempoPromedioMs / binMem.tiempoPromedioMs,
      ratioCompMem: secMem.comparacionesPromedio / binMem.comparacionesPromedio,
      ratioTiempoArc: secArc.tiempoPromedioMs / binArc.tiempoPromedioMs,
      ratioCompArc: secArc.comparacionesPromedio / binArc.comparacionesPromedio,
      // Predicciones teóricas para validar
      predSecComp: 0.75 * n,                 // 50/50 mix: mitad de hits (n/2), mitad de misses (n)
      predBinComp: Math.log2(n),
    });

    console.log(
      `  Memoria → sec ${secMem.tiempoPromedioMs.toFixed(4)} ms, bin ${binMem.tiempoPromedioMs.toFixed(4)} ms (ratio ${(secMem.tiempoPromedioMs / binMem.tiempoPromedioMs).toFixed(1)}×)`
    );
    console.log(
      `  Archivo → sec ${secArc.tiempoPromedioMs.toFixed(4)} ms, bin ${binArc.tiempoPromedioMs.toFixed(4)} ms (ratio ${(secArc.tiempoPromedioMs / binArc.tiempoPromedioMs).toFixed(1)}×)`
    );
  }

  // ---- Tabla final ----
  console.log('\n\n══════════════════════════════════════════════════════════════════════════════════════════');
  console.log('CUADRO COMPARATIVO — Búsqueda Secuencial vs Binaria');
  console.log('══════════════════════════════════════════════════════════════════════════════════════════');
  console.log(
    '| N         | Entorno | Algoritmo  | Tiempo prom. (ms) | Comparaciones | Complejidad |'
  );
  console.log(
    '|-----------|---------|------------|-------------------|---------------|-------------|'
  );
  for (const r of resultados) {
    const nStr = r.n.toLocaleString('es').padStart(9);
    console.log(
      `| ${nStr} | Memoria | Secuencial | ${r.secMem.tiempoPromedioMs.toFixed(4).padStart(17)} | ${r.secMem.comparacionesPromedio.toFixed(0).padStart(13)} | O(n)        |`
    );
    console.log(
      `| ${''.padStart(9)} | Memoria | Binaria    | ${r.binMem.tiempoPromedioMs.toFixed(4).padStart(17)} | ${r.binMem.comparacionesPromedio.toFixed(0).padStart(13)} | O(log n)    |`
    );
    console.log(
      `| ${''.padStart(9)} | Archivo | Secuencial | ${r.secArc.tiempoPromedioMs.toFixed(4).padStart(17)} | ${r.secArc.comparacionesPromedio.toFixed(0).padStart(13)} | O(n)        |`
    );
    console.log(
      `| ${''.padStart(9)} | Archivo | Binaria    | ${r.binArc.tiempoPromedioMs.toFixed(4).padStart(17)} | ${r.binArc.comparacionesPromedio.toFixed(0).padStart(13)} | O(log n)    |`
    );
  }

  // ---- Validación teórica vs experimental ----
  console.log('\n\nVALIDACIÓN TEÓRICA vs EXPERIMENTAL');
  console.log('───────────────────────────────────────────────────────────────');
  console.log('| N         | Comparaciones sec. | pred. 0.75n | Comparaciones bin. | pred. log₂n |');
  for (const r of resultados) {
    console.log(
      `| ${r.n.toLocaleString('es').padStart(9)} | ${r.secMem.comparacionesPromedio.toFixed(0).padStart(18)} | ${r.predSecComp.toFixed(0).padStart(11)} | ${r.binMem.comparacionesPromedio.toFixed(0).padStart(18)} | ${r.predBinComp.toFixed(1).padStart(11)} |`
    );
  }

  // ---- Archivos de salida ----
  fs.writeFileSync(
    path.join(__dirname, '..', 'resultados-benchmark-busqueda.json'),
    JSON.stringify(resultados, null, 2)
  );
  escribirSVG(
    resultados,
    'secMem',
    'binMem',
    'Búsqueda en memoria: Secuencial vs Binaria',
    path.join(__dirname, '..', 'grafico-busqueda-memoria.svg')
  );
  escribirSVG(
    resultados,
    'secArc',
    'binArc',
    'Búsqueda en archivo indexado: Secuencial vs Binaria',
    path.join(__dirname, '..', 'grafico-busqueda-archivo.svg')
  );
}

main();