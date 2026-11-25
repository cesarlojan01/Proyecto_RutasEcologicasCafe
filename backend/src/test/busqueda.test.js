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