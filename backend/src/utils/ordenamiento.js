/**
 * MÓDULO DE ORDENAMIENTO MULTICRITERIO
 * ====================================
 * Implementación propia de dos algoritmos de ordenación O(n log n):
 *
 *  - MergeSort (ordenación por mezcla)
 *      · Divide el arreglo en mitades, ordena cada mitad y las mezcla.
 *      · Tiempo: O(n log n) en el mejor, promedio y peor caso.
 *      · Memoria extra: O(n) (arreglo auxiliar).
 *      · ESTABLE: dos registros "iguales" conservan su orden original.
 *
 *  - QuickSort (ordenación rápida)
 *      · Elige un pivote, separa menores a un lado y mayores al otro (partición)
 *        y repite en cada lado.
 *      · Tiempo: O(n log n) promedio; O(n²) en el peor caso (muy improbable con
 *        pivote "mediana de tres").
 *      · Memoria extra: O(log n) (pila de recursión) — ordena "en el sitio".
 *      · NO ESTABLE.
 *
 * Ambos reciben un comparador creado a partir de VARIOS criterios, p. ej.:
 *   [{ campo: 'riesgoDeterioro', orden: 'asc' }, { campo: 'emisionesCO2Kg', orden: 'asc' }]
 * → ordena por riesgo y, si hay empate, por CO2 (como ORDER BY en SQL).
 */
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
      if (r !== 0 && c.desc && va != null && vb != null) r = -r;
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
