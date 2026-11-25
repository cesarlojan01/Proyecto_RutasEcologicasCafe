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