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