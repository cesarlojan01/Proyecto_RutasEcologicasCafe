/**
 * Colas de prioridad implementadas desde cero (sin librerías ni Array.sort()).
 *
 * Ambas clases tienen la misma interfaz, así Dijkstra puede usar cualquiera:
 *   insertar(valor, prioridad)  -> agrega un elemento
 *   extraerMinimo()             -> saca y devuelve { valor, prioridad } con la MENOR prioridad
 *   estaVacia()                 -> true si no quedan elementos
 *   tamano                      -> cantidad de elementos
 *
 * - ColaPrioridadHeap: min-heap binario. insertar y extraerMinimo cuestan O(log n).
 * - ColaPrioridadArreglo: arreglo simple. insertar O(1), extraerMinimo O(n).
 *   Sirve solo para comparar tiempos con el heap (Dijkstra O(V²) vs O((V+E) log V)).
 */

class ColaPrioridadHeap {
  constructor() {
    // El heap se guarda en un arreglo: el hijo izquierdo de i está en 2i+1,
    // el derecho en 2i+2 y el padre en (i-1)/2. La raíz (índice 0) es el mínimo.
    this.elementos = [];
  }

  get tamano() {
    return this.elementos.length;
  }

  estaVacia() {
    return this.elementos.length === 0;
  }

  insertar(valor, prioridad) {
    this.elementos.push({ valor, prioridad });
    this.subir(this.elementos.length - 1);
  }

  extraerMinimo() {
    if (this.elementos.length === 0) return null;
    const minimo = this.elementos[0];
    const ultimo = this.elementos.pop();
    if (this.elementos.length > 0) {
      // El último elemento pasa a la raíz y se hunde hasta su lugar.
      this.elementos[0] = ultimo;
      this.bajar(0);
    }
    return minimo;
  }

  verMinimo() {
    return this.elementos.length > 0 ? this.elementos[0] : null;
  }

  /** Sube el elemento i mientras sea menor que su padre. */
  subir(i) {
    const e = this.elementos;
    while (i > 0) {
      const padre = (i - 1) >> 1;
      if (e[i].prioridad >= e[padre].prioridad) break;
      this.intercambiar(i, padre);
      i = padre;
    }
  }

  /** Baja el elemento i mientras alguno de sus hijos sea menor. */
  bajar(i) {
    const e = this.elementos;
    const n = e.length;
    for (;;) {
      const izq = 2 * i + 1;
      const der = izq + 1;
      let menor = i;
      if (izq < n && e[izq].prioridad < e[menor].prioridad) menor = izq;
      if (der < n && e[der].prioridad < e[menor].prioridad) menor = der;
      if (menor === i) break;
      this.intercambiar(i, menor);
      i = menor;
    }
  }

  intercambiar(a, b) {
    const tmp = this.elementos[a];
    this.elementos[a] = this.elementos[b];
    this.elementos[b] = tmp;
  }
}

class ColaPrioridadArreglo {
  constructor() {
    this.elementos = [];
  }

  get tamano() {
    return this.elementos.length;
  }

  estaVacia() {
    return this.elementos.length === 0;
  }

  insertar(valor, prioridad) {
    this.elementos.push({ valor, prioridad });
  }

  /** Recorre todo el arreglo para encontrar el mínimo: O(n). */
  extraerMinimo() {
    const e = this.elementos;
    if (e.length === 0) return null;
    let indiceMin = 0;
    for (let i = 1; i < e.length; i++) {
      if (e[i].prioridad < e[indiceMin].prioridad) indiceMin = i;
    }
    const minimo = e[indiceMin];
    // Se reemplaza por el último para borrar en O(1) (el orden no importa aquí).
    e[indiceMin] = e[e.length - 1];
    e.pop();
    return minimo;
  }
}

module.exports = { ColaPrioridadHeap, ColaPrioridadArreglo };
