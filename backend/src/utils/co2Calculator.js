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
