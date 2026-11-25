function busquedaSecuencial(arreglo, objetivo, obtenerClave = (r) => r.id) {
  let comparaciones = 0;
  for (let i = 0; i < arreglo.length; i++) {
    comparaciones++;
    if (obtenerClave(arreglo[i]) === objetivo) {
      return { indice: i, comparaciones };
    }
  }
  return { indice: -1, comparaciones };
}

/**
 * @param {Array}    arreglo       Lista ORDENADA por `comparar`.
 * @param {*}        objetivo      Clave a buscar.
 * @param {Function} obtenerClave  Cómo extraer la clave de cada elemento.
 * @param {Function} comparar      Comparador (a, b) → negativo/0/positivo.
 *                                 Default: orden numérico/lexicográfico JS.
 *                                 Si los datos se ordenaron con Intl.Collator,
 *                                 pasar ese mismo comparador.
 */
function busquedaBinaria(
  arreglo,
  objetivo,
  obtenerClave = (r) => r.id,
  comparar = (a, b) => (a < b ? -1 : a > b ? 1 : 0)
) {
  let comparaciones = 0;
  let inicio = 0;
  let fin = arreglo.length - 1;

  while (inicio <= fin) {
    const medio = (inicio + fin) >>> 1;
    comparaciones++;
    const claveMedia = obtenerClave(arreglo[medio]);
    const r = comparar(claveMedia, objetivo);
    if (r === 0) return { indice: medio, comparaciones };
    if (r < 0) inicio = medio + 1;
    else fin = medio - 1;
  }
  return { indice: -1, comparaciones };
}

module.exports = { busquedaSecuencial, busquedaBinaria };