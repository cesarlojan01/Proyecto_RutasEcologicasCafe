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