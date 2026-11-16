/**
 * Calcula un índice estimado de riesgo de deterioro del banano (0 a 100).
 *
 * Considera:
 * - Tiempo de transporte.
 * - Temperatura.
 * - Humedad relativa.
 * - Estado de la carretera.
 */

function calcularRiesgoDeterioroBanano({
  duracionMin,
  temperatura,
  humedad,
  factorRiesgoCarretera,
}) {
  // Tiempo de transporte: referencia inicial de 4 horas.
  const tiempoNorm = clamp(duracionMin / 240, 0, 1);

  // Temperatura recomendada de referencia: entre 13 y 14 °C.
  // Tanto el frío excesivo como el calor elevan el riesgo.
  const temperaturaNorm = clamp(
    Math.abs(temperatura - 13.5) / 15,
    0,
    1
  );

  // Humedad recomendada de referencia: entre 90 % y 95 %.
  const humedadNorm = clamp(
    Math.abs(humedad - 92.5) / 50,
    0,
    1
  );

  const carreteraNorm = clamp(factorRiesgoCarretera, 0, 1);

  // Pesos iniciales del modelo.
  const pesos = {
    tiempo: 0.35,
    temperatura: 0.35,
    humedad: 0.20,
    carretera: 0.10,
  };

  const riesgo =
    tiempoNorm * pesos.tiempo +
    temperaturaNorm * pesos.temperatura +
    humedadNorm * pesos.humedad +
    carreteraNorm * pesos.carretera;

  return Number((riesgo * 100).toFixed(1));
}

function clamp(valor, min, max) {
  return Math.min(Math.max(valor, min), max);
}

module.exports = { calcularRiesgoDeterioroBanano };