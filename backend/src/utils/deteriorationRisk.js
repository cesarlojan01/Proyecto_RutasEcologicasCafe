/**
 * Cálculo de riesgo de deterioro multiproducto (Unidad 2).
 *
 * Cada factor se normaliza a [0, 1] con las bandas del perfil y se pondera con
 * `pesosDeterioro`. Agnóstico al producto: el perfil lo inyecta el orquestador.
 *
 * Bandas (ver models/ProductoAgricola.js):
 *   - Lado superior (obligatorio): riesgo 0 hasta `optimaMax`, 1 desde `criticaMax`.
 *   - Lado inferior (opcional):    riesgo 0 desde `optimaMin`, 1 desde `criticaMin`.
 *
 * Un perfil inválido LANZA ERROR. Nunca se devuelve "riesgo 0" como valor de escape:
 * para un producto perecedero, 0 es la respuesta más peligrosa que se puede dar.
 */

/**
 * @typedef {Object} Condiciones
 * @property {number} duracionMin           Duración total del trayecto (min).
 * @property {number} temperatura           Temperatura ambiente (°C).
 * @property {number} humedad               Humedad relativa (%).
 * @property {number} lluviaMm              Intensidad de lluvia (mm/h). Es la misma unidad que
 *                                          `lluviaCriticaMmH` y que devuelve weatherService (rain['1h']).
 * @property {number} factorRiesgoCarretera Riesgo físico de la vía [0, 1].
 * @property {number} variacionAltitud      Desnivel a lo largo de la ruta (m).
 */

const CONDICIONES = ['duracionMin', 'temperatura', 'humedad', 'lluviaMm', 'factorRiesgoCarretera', 'variacionAltitud'];

function calcularDesgloseRiesgo(condiciones, perfilProducto) {
  if (!perfilProducto) {
    throw new Error('calcularRiesgoDeterioro: se requiere perfilProducto (ver data/productos/cafe.js)');
  }
  // Un NaN en UNA ruta contamina el min-max de TODAS las rutas de la consulta.
  for (const k of CONDICIONES) {
    if (!Number.isFinite(condiciones[k])) {
      throw new Error(`calcularRiesgoDeterioro: condición "${k}" no es un número finito (${condiciones[k]})`);
    }
  }

  const { duracionMin, temperatura, humedad, lluviaMm, factorRiesgoCarretera, variacionAltitud } = condiciones;
  const {
    vidaUtilHoras, sensibilidadTermica, sensibilidadHumedad, lluviaCriticaMmH,
    toleranciaFisica, variacionAltitudCriticaM, pesosDeterioro,
  } = perfilProducto;

  const tiempoNorm      = normalizarAscendente(duracionMin, 0, vidaUtilHoras * 60, 'vidaUtilHoras');
  const temperaturaNorm = riesgoBanda(temperatura, sensibilidadTermica, 'sensibilidadTermica');
  const humedadNorm     = riesgoBanda(humedad, sensibilidadHumedad, 'sensibilidadHumedad');
  const lluviaNorm      = normalizarAscendente(lluviaMm, 0, lluviaCriticaMmH, 'lluviaCriticaMmH');
  // Semántica de toleranciaFisica: fracción del factor de vía que se tolera sin daño.
  const carreteraNorm   = normalizarAscendente(factorRiesgoCarretera, toleranciaFisica, 1, 'toleranciaFisica');
  const altitudNorm     = normalizarAscendente(variacionAltitud, 0, variacionAltitudCriticaM, 'variacionAltitudCriticaM');

  // Mismo orden de operaciones que la Unidad 1 -> paridad bit-a-bit para el perfil de café.
  const penalizaciones = {
    tiempo:      tiempoNorm      * pesosDeterioro.tiempo,
    temperatura: temperaturaNorm * pesosDeterioro.temperatura,
    humedad:     humedadNorm     * pesosDeterioro.humedad,
    lluvia:      lluviaNorm      * pesosDeterioro.lluvia,
    carretera:   carreteraNorm   * pesosDeterioro.carretera,
    altitud:     altitudNorm     * pesosDeterioro.altitud,
  };

  const riesgoTotal =
    penalizaciones.tiempo +
    penalizaciones.temperatura +
    penalizaciones.humedad +
    penalizaciones.lluvia +
    penalizaciones.carretera +
    penalizaciones.altitud;

  return { riesgo: Number((riesgoTotal * 100).toFixed(1)), penalizaciones };
}

function calcularRiesgoDeterioro(condiciones, perfilProducto) {
  return calcularDesgloseRiesgo(condiciones, perfilProducto).riesgo;
}

/** Riesgo [0,1] de una banda: lado superior siempre; lado inferior solo si el perfil lo declara. */
function riesgoBanda(valor, banda, factor) {
  const superior = normalizarAscendente(valor, banda.optimaMax, banda.criticaMax, `${factor}.superior`);
  if (banda.criticaMin == null) return superior; // sin lado frío/seco (p. ej. café)
  const inferior = normalizarDescendente(valor, banda.optimaMin, banda.criticaMin, `${factor}.inferior`);
  return Math.max(superior, inferior); // solo uno de los dos lados puede ser > 0
}

/** 0 en `optimo`, 1 en `critico`, creciente. Exige critico > optimo. */
function normalizarAscendente(valor, optimo, critico, factor) {
  if (!(critico > optimo)) {
    throw new Error(`Perfil inválido (${factor}): el límite crítico (${critico}) debe ser mayor que el óptimo (${optimo})`);
  }
  return clamp((valor - optimo) / (critico - optimo), 0, 1);
}

/** 0 en `optimo`, 1 en `critico`, decreciente. Exige critico < optimo. */
function normalizarDescendente(valor, optimo, critico, factor) {
  if (!(critico < optimo)) {
    throw new Error(`Perfil inválido (${factor}): el límite crítico (${critico}) debe ser menor que el óptimo (${optimo})`);
  }
  return clamp((optimo - valor) / (optimo - critico), 0, 1);
}

function clamp(valor, min, max) {
  return Math.min(Math.max(valor, min), max);
}

module.exports = { calcularRiesgoDeterioro, calcularDesgloseRiesgo };