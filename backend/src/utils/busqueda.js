/**
 * Algoritmos de búsqueda instrumentados.
 *
 * - busquedaSecuencial: recorre la lista de principio a fin → O(n)
 * - busquedaBinaria: divide y vencerás sobre lista ORDENADA → O(log n)
 *
 * Ambos devuelven { indice, comparaciones }:
 *   indice         posición del elemento, o -1 si no existe
 *   comparaciones  cuántas veces se comparó una clave (para el informe)
 */

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

function busquedaBinaria(arreglo, objetivo, obtenerClave = (r) => r.id) {
  let comparaciones = 0;
  let inicio = 0;
  let fin = arreglo.length - 1;

  while (inicio <= fin) {
    const medio = (inicio + fin) >>> 1;
    comparaciones++;
    const claveMedia = obtenerClave(arreglo[medio]);
    if (claveMedia === objetivo) return { indice: medio, comparaciones };
    if (claveMedia < objetivo) inicio = medio + 1;
    else fin = medio - 1;
  }
  return { indice: -1, comparaciones };
}

module.exports = { busquedaSecuencial, busquedaBinaria };