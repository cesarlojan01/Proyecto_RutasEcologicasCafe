/**
 * Grafo dirigido y ponderado representado con LISTA DE ADYACENCIA,
 * implementado desde cero.
 *
 * - nodos:       Map  id -> datos del nodo (por ejemplo { lat, lng })
 * - adyacencia:  Map  id -> Map(idDestino -> arista)
 *
 * Se usa un Map por nodo para que, si dos rutas comparten el mismo tramo,
 * la arista no se duplique: se conserva la de menor peso.
 * Una carretera de doble sentido se representa con dos aristas (ida y vuelta).
 */
class Grafo {
  constructor() {
    this.nodos = new Map();
    this.adyacencia = new Map();
    this.totalAristas = 0;
  }

  agregarNodo(id, datos = {}) {
    if (!this.nodos.has(id)) {
      this.nodos.set(id, datos);
      this.adyacencia.set(id, new Map());
    }
    return this;
  }

  tieneNodo(id) {
    return this.nodos.has(id);
  }

  obtenerNodo(id) {
    return this.nodos.get(id);
  }

  /**
   * Agrega la arista origen -> destino con el peso indicado.
   * Dijkstra exige pesos NO negativos, por eso se valida aquí.
   */
  agregarArista(origen, destino, peso, datos = {}) {
    if (typeof peso !== 'number' || !Number.isFinite(peso) || peso < 0) {
      throw new Error(`Peso inválido en la arista ${origen} -> ${destino}: ${peso} (debe ser un número >= 0)`);
    }
    this.agregarNodo(origen);
    this.agregarNodo(destino);

    const salientes = this.adyacencia.get(origen);
    const existente = salientes.get(destino);
    if (!existente) {
      salientes.set(destino, { origen, destino, peso, ...datos });
      this.totalAristas++;
    } else if (peso < existente.peso) {
      salientes.set(destino, { origen, destino, peso, ...datos });
    }
    return this;
  }

  /** Agrega la arista en ambos sentidos. */
  agregarAristaDoble(a, b, peso, datos = {}) {
    this.agregarArista(a, b, peso, datos);
    this.agregarArista(b, a, peso, datos);
    return this;
  }

  /** Aristas que salen del nodo (iterable). */
  vecinos(id) {
    const salientes = this.adyacencia.get(id);
    return salientes ? salientes.values() : [];
  }

  obtenerArista(origen, destino) {
    const salientes = this.adyacencia.get(origen);
    return salientes ? salientes.get(destino) : undefined;
  }

  get cantidadNodos() {
    return this.nodos.size;
  }

  get cantidadAristas() {
    return this.totalAristas;
  }
}

module.exports = { Grafo };
