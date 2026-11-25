/**
 * (USO LOCAL — esta carpeta no se sube al repositorio)
 * Pruebas del módulo de ordenamiento. Ejecutar dentro de backend/:
 *     node --test local/ordenamiento.test.js
 */
const test = require('node:test');
const assert = require('node:assert/strict');

const {
  mergeSort, quickSort, crearComparador, parsearCriterios, ordenarConMetricas, estaOrdenado,
} = require('../src/utils/ordenamiento');
const { generarRutasEvaluadas, generarFincas, generarPlantas } = require('./generadorDatos');

const ALGORITMOS = { mergeSort, quickSort };
const porDistancia = crearComparador('distanciaKm:asc');

/** Ordenamiento por inserción O(n²): algoritmo independiente usado solo para verificar resultados */
function ordenarPorInsercion(arreglo, comparar) {
  const d = arreglo.slice();
  for (let i = 1; i < d.length; i++) {
    const x = d[i];
    let j = i - 1;
    while (j >= 0 && comparar(d[j], x) > 0) {
      d[j + 1] = d[j];
      j--;
    }
    d[j + 1] = x;
  }
  return d;
}

for (const [nombre, ordenar] of Object.entries(ALGORITMOS)) {
  test(`${nombre}: casos borde (vacío, un elemento, dos elementos)`, () => {
    assert.deepEqual(ordenar([], porDistancia), []);
    assert.deepEqual(ordenar([{ distanciaKm: 5 }], porDistancia), [{ distanciaKm: 5 }]);
    assert.deepEqual(ordenar([{ distanciaKm: 9 }, { distanciaKm: 2 }], porDistancia), [{ distanciaKm: 2 }, { distanciaKm: 9 }]);
  });

  test(`${nombre}: no modifica el arreglo original`, () => {
    const original = [{ distanciaKm: 3 }, { distanciaKm: 1 }, { distanciaKm: 2 }];
    const copia = JSON.parse(JSON.stringify(original));
    ordenar(original, porDistancia);
    assert.deepEqual(original, copia);
  });

  test(`${nombre}: ordena 20 000 registros aleatorios, ordenados, invertidos e iguales`, () => {
    const datos = generarRutasEvaluadas(20000, 1);
    const ordenados = ordenar(datos, porDistancia);
    const entradas = {
      aleatorios: datos,
      ordenados,
      invertidos: ordenados.slice().reverse(),
      iguales: datos.map((d) => ({ ...d, distanciaKm: 10 })),
    };
    for (const [caso, entrada] of Object.entries(entradas)) {
      const r = ordenar(entrada, porDistancia);
      assert.equal(r.length, entrada.length, caso);
      assert.ok(estaOrdenado(r, porDistancia), caso);
      // Mismos elementos que la entrada (no se pierde ni se duplica ninguno)
      assert.equal(new Set(r).size, entrada.length, caso);
    }
  });

  test(`${nombre}: da el mismo orden que un ordenamiento por inserción (criterios múltiples)`, () => {
    const cmp = crearComparador('estadoCarretera:asc,planta:asc,riesgoDeterioro:desc,id:asc');
    const datos = generarRutasEvaluadas(2000, 3);
    assert.deepEqual(ordenar(datos, cmp).map((d) => d.id), ordenarPorInsercion(datos, cmp).map((d) => d.id));
  });
}

test('Comparador: desempata con el segundo criterio', () => {
  const datos = [
    { riesgo: 50, co2: 30, id: 'a' },
    { riesgo: 20, co2: 90, id: 'b' },
    { riesgo: 50, co2: 10, id: 'c' },
  ];
  const r = mergeSort(datos, crearComparador('riesgo:asc,co2:asc'));
  assert.deepEqual(r.map((x) => x.id), ['b', 'c', 'a']);
});

test('Comparador: orden descendente, campos anidados y fechas', () => {
  const datos = [{ clima: { temperatura: 18 } }, { clima: { temperatura: 30 } }, { clima: { temperatura: 22 } }];
  const r = quickSort(datos, crearComparador('clima.temperatura:desc'));
  assert.deepEqual(r.map((x) => x.clima.temperatura), [30, 22, 18]);

  const fechas = [{ f: new Date('2026-05-01') }, { f: new Date('2026-01-15') }, { f: new Date('2026-03-10') }];
  const porFecha = mergeSort(fechas, crearComparador('f:asc')).map((x) => x.f.getUTCMonth() + 1);
  assert.deepEqual(porFecha, [1, 3, 5]);
});

test('Comparador: texto en español (tildes y mayúsculas) y valores vacíos al final', () => {
  const datos = [{ n: 'Zaruma' }, { n: null }, { n: 'ávila' }, { n: 'Loja' }];
  const asc = mergeSort(datos, crearComparador('n:asc')).map((x) => x.n);
  const desc = mergeSort(datos, crearComparador('n:desc')).map((x) => x.n);
  assert.deepEqual(asc, ['ávila', 'Loja', 'Zaruma', null]);
  assert.deepEqual(desc, ['Zaruma', 'Loja', 'ávila', null]);
});

test('MergeSort es estable: los empates conservan el orden original', () => {
  const datos = generarRutasEvaluadas(10000, 5).map((d, i) => ({ ...d, posicion: i }));
  const cmp = crearComparador('estadoCarretera:asc'); // solo 3 valores posibles → muchísimos empates
  const r = mergeSort(datos, cmp);
  for (let i = 1; i < r.length; i++) {
    if (cmp(r[i - 1], r[i]) === 0) assert.ok(r[i - 1].posicion < r[i].posicion);
  }
});

test('parsearCriterios: interpreta el texto de la URL', () => {
  assert.deepEqual(parsearCriterios('riesgoDeterioro:desc, distanciaKm'), [
    { campo: 'riesgoDeterioro', orden: 'desc' },
    { campo: 'distanciaKm', orden: 'asc' },
  ]);
  assert.throws(() => crearComparador(''));
});

test('ordenarConMetricas: devuelve tiempo y número de comparaciones', () => {
  const datos = generarRutasEvaluadas(1000, 8);
  for (const alg of ['merge', 'quick']) {
    const { datos: r, metricas } = ordenarConMetricas(alg, datos, 'emisionesCO2Kg:asc');
    assert.equal(metricas.n, 1000);
    assert.ok(metricas.tiempoMs >= 0);
    // Un ordenamiento por comparación necesita al menos ~n·log2(n) − 1,44n comparaciones
    assert.ok(metricas.comparaciones > 1000 * Math.log2(1000) - 1.443 * 1000);
    assert.ok(estaOrdenado(r, crearComparador('emisionesCO2Kg:asc')));
  }
  assert.throws(() => ordenarConMetricas('burbuja', datos, 'distanciaKm'));
});

test('Dataset del archivo: MergeSort y QuickSort lo ordenan y coinciden entre sí', () => {
  const { cargarDataset } = require('./generadorDatos');
  const dataset = cargarDataset();
  assert.ok(dataset.length >= 1000);
  // "id" como último criterio: sin empates, así los dos algoritmos deben dar exactamente el mismo orden
  const cmp = crearComparador('riesgoDeterioro:asc,emisionesCO2Kg:asc,distanciaKm:asc,id:asc');
  assert.equal(estaOrdenado(dataset, cmp), false);
  const m = mergeSort(dataset, cmp);
  const q = quickSort(dataset, cmp);
  assert.ok(estaOrdenado(m, cmp));
  assert.deepEqual(m.map((r) => r.id), q.map((r) => r.id));
});

test('Datos de carga: cumplen los modelos de Mongoose (Finca, Planta, RutaHistorial)', () => {
  const Finca = require('../src/models/Finca');
  const Planta = require('../src/models/Planta');
  const RutaHistorial = require('../src/models/RutaHistorial');
  const { construirEvaluaciones, MARCA } = require('./poblarDatos');

  const fincas = generarFincas(50).map((f) => new Finca({ ...f, contacto: MARCA }));
  const plantas = generarPlantas().map((p) => new Planta({ ...p, contacto: MARCA }));
  for (const doc of [...fincas, ...plantas]) assert.equal(doc.validateSync(), undefined);

  const evaluaciones = construirEvaluaciones(fincas, plantas, 300);
  for (const e of evaluaciones) {
    const doc = new RutaHistorial(e);
    assert.equal(doc.validateSync(), undefined);
    assert.ok(doc.rutasEvaluadas.length >= 1 && doc.rutasEvaluadas.length <= 3);
    assert.equal(doc.rutaSeleccionada.puntajeEcologico, doc.rutasEvaluadas[0].puntajeEcologico);
    assert.equal(doc.createdAt.getTime(), e.createdAt.getTime());
    // La ruta seleccionada es la de menor puntaje ecológico
    for (const ruta of doc.rutasEvaluadas) assert.ok(ruta.puntajeEcologico >= doc.rutaSeleccionada.puntajeEcologico);
  }
});
