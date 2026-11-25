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