class MinHeap {
  constructor(comparar) {
    if (typeof comparar !== 'function') throw new Error('MinHeap requiere una función comparar');
    this.comparar = comparar; // (a,b) => neg si a<b, 0, pos si a>b
    this.datos = [];
  }

  get tamaño() { return this.datos.length; }

  estaVacio() { return this.datos.length === 0; }

  verMinimo() { return this.datos.length === 0 ? undefined : this.datos[0]; }

  insertar(valor) {
    this.datos.push(valor);
    this._subir(this.datos.length - 1);
    return this;
  }

  extraerMinimo() {
    if (this.datos.length === 0) return undefined;
    const min = this.datos[0];
    const ultimo = this.datos.pop();
    if (this.datos.length > 0) {
      this.datos[0] = ultimo;
      this._bajar(0);
    }
    return min;
  }

  /** Construye el heap en O(n) a partir de un arreglo (bottom-up heapify). */
  static desdeArreglo(arreglo, comparar) {
    const h = new MinHeap(comparar);
    h.datos = arreglo.slice();
    for (let i = (h.datos.length >> 1) - 1; i >= 0; i--) h._bajar(i);
    return h;
  }

  /**
   * Devuelve los K menores elementos SIN ordenar todo el arreglo.
   * Complejidad: O(n log K), mejor que O(n log n) cuando K << n.
   */
  static topK(arreglo, k, comparar) {
    if (k <= 0) return [];
    const maxHeap = new MinHeap((a, b) => -comparar(a, b)); // max-heap auxiliar
    for (const elemento of arreglo) {
      if (maxHeap.tamaño < k) maxHeap.insertar(elemento);
      else if (comparar(elemento, maxHeap.verMinimo()) < 0) {
        maxHeap.extraerMinimo();
        maxHeap.insertar(elemento);
      }
    }
    // Vaciar el max-heap (devuelve de mayor a menor) y revertir
    const resultado = [];
    while (!maxHeap.estaVacio()) resultado.push(maxHeap.extraerMinimo());
    return resultado.reverse();
  }

  _subir(i) {
    while (i > 0) {
      const padre = (i - 1) >> 1;
      if (this.comparar(this.datos[i], this.datos[padre]) >= 0) break;
      [this.datos[i], this.datos[padre]] = [this.datos[padre], this.datos[i]];
      i = padre;
    }
  }

  _bajar(i) {
    const n = this.datos.length;
    for (;;) {
      let menor = i;
      const izq = 2 * i + 1;
      const der = 2 * i + 2;
      if (izq < n && this.comparar(this.datos[izq], this.datos[menor]) < 0) menor = izq;
      if (der < n && this.comparar(this.datos[der], this.datos[menor]) < 0) menor = der;
      if (menor === i) break;
      [this.datos[i], this.datos[menor]] = [this.datos[menor], this.datos[i]];
      i = menor;
    }
  }
}

module.exports = { MinHeap };