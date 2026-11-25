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