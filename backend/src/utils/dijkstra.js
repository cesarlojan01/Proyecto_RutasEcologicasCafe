/**
 * Algoritmo de Dijkstra implementado desde cero.
 *
 * Encuentra el camino de MENOR COSTO entre dos nodos de un grafo con pesos
 * no negativos. Idea: se confirma siempre el nodo pendiente con menor costo
 * acumulado; en ese momento su costo ya es definitivo, porque cualquier otro
 * camino tendría que pasar por nodos que cuestan más.
 *
 * Complejidad:
 *   - con min-heap (por defecto):  O((V + E) log V)
 *   - con arreglo simple:          O(V² + E)
 *   Espacio: O(V) para costos, predecesores y visitados.
 *
 * Se usa la variante de "inserción perezosa": en lugar de disminuir la
 * prioridad de un nodo dentro del heap, se inserta de nuevo con el costo
 * mejorado y, al extraerlo, se descartan las entradas viejas (ya visitadas).
 */
const { performance } = require('perf_hooks');
const { ColaPrioridadHeap, ColaPrioridadArreglo } = require('./colaPrioridad');

/**
 * @param {import('./grafo').Grafo} grafo
 * @param {string} origen   id del nodo de partida
 * @param {string} destino  id del nodo de llegada
 * @param {{ cola?: 'heap' | 'arreglo' }} opciones
 * @returns {{
 *   encontrado: boolean, costo: number, camino: string[], aristas: object[],
 *   metricas: { cola: string, nodos: number, aristas: number, nodosVisitados: number,
 *               relajaciones: number, tiempoMs: number }
 * }}
 */
function dijkstra(grafo, origen, destino, opciones = {}) {
  const tipoCola = opciones.cola === 'arreglo' ? 'arreglo' : 'heap';
  const inicio = performance.now();

  if (!grafo.tieneNodo(origen) || !grafo.tieneNodo(destino)) {
    throw new Error(`El origen (${origen}) o el destino (${destino}) no existen en el grafo`);
  }

  const costos = new Map();       // id -> menor costo conocido desde el origen
  const predecesores = new Map(); // id -> id del nodo anterior en el mejor camino
  const visitados = new Set();    // nodos con costo ya definitivo
  const cola = tipoCola === 'arreglo' ? new ColaPrioridadArreglo() : new ColaPrioridadHeap();

  // 1. Todos los nodos empiezan en infinito, excepto el origen.
  for (const id of grafo.nodos.keys()) costos.set(id, Infinity);
  costos.set(origen, 0);
  cola.insertar(origen, 0);

  let relajaciones = 0;

  // 2. Ciclo principal: confirmar el pendiente más barato y relajar sus vecinos.
  while (!cola.estaVacia()) {
    const { valor: actual, prioridad: costoActual } = cola.extraerMinimo();

    if (visitados.has(actual)) continue; // entrada vieja de la inserción perezosa
    visitados.add(actual);

    if (actual === destino) break; // el costo del destino ya es definitivo

    for (const arista of grafo.vecinos(actual)) {
      if (visitados.has(arista.destino)) continue;
      const nuevoCosto = costoActual + arista.peso;
      // Relajación: ¿es más barato llegar al vecino pasando por "actual"?
      if (nuevoCosto < costos.get(arista.destino)) {
        costos.set(arista.destino, nuevoCosto);
        predecesores.set(arista.destino, actual);
        cola.insertar(arista.destino, nuevoCosto);
        relajaciones++;
      }
    }
  }

  // 3. Reconstruir el camino desde el destino hacia atrás.
  const costo = costos.get(destino);
  const encontrado = costo !== Infinity;
  const camino = encontrado ? reconstruirCamino(predecesores, origen, destino) : [];
  const aristas = [];
  for (let i = 0; i + 1 < camino.length; i++) {
    aristas.push(grafo.obtenerArista(camino[i], camino[i + 1]));
  }

  return {
    encontrado,
    costo,
    camino,
    aristas,
    metricas: {
      cola: tipoCola,
      nodos: grafo.cantidadNodos,
      aristas: grafo.cantidadAristas,
      nodosVisitados: visitados.size,
      relajaciones,
      tiempoMs: Number((performance.now() - inicio).toFixed(3)),
    },
  };
}

/** Sigue la cadena de predecesores desde el destino y la invierte sin usar reverse(). */
function reconstruirCamino(predecesores, origen, destino) {
  const alReves = [];
  let actual = destino;
  while (actual !== undefined) {
    alReves.push(actual);
    if (actual === origen) break;
    actual = predecesores.get(actual);
  }
  const camino = new Array(alReves.length);
  for (let i = 0; i < alReves.length; i++) {
    camino[i] = alReves[alReves.length - 1 - i];
  }
  return camino;
}

/** Imprime en la consola del servidor el resultado de una ejecución. */
function registrarMetricasDijkstra(origenDelLlamado, resultado) {
  const m = resultado.metricas;
  console.log(
    `[dijkstra] ${origenDelLlamado} | cola=${m.cola} | nodos=${m.nodos} | aristas=${m.aristas}` +
      ` | visitados=${m.nodosVisitados} | relajaciones=${m.relajaciones} | ${m.tiempoMs} ms` +
      ` | costo=${Number.isFinite(resultado.costo) ? resultado.costo.toFixed(4) : 'sin camino'}`
  );
}

module.exports = { dijkstra, reconstruirCamino, registrarMetricasDijkstra };
