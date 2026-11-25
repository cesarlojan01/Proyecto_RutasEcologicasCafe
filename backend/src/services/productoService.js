const { cargarCatalogo } = require('../data/productos');

const SLUG_DEFAULT = 'cafe';

// Un Map evita que slugs como "constructor" o "__proto__" resuelvan a propiedades de Object.prototype.
const catalogo = cargarCatalogo();
if (!catalogo.has(SLUG_DEFAULT)) {
  throw new Error(`productoService: falta el perfil por defecto "${SLUG_DEFAULT}" en data/productos/`);
}

function errorSlug(mensaje) {
  const err = new Error(mensaje);
  err.status = 400;
  return err;
}

/**
 * @param {string|null|undefined} slug
 * @returns {Object} perfil validado y congelado
 * @throws {Error} con status 400 si el slug no existe o no es texto
 */
function cargarPerfil(slug) {
  if (slug != null && typeof slug !== 'string') {
    throw errorSlug('productoSlug debe ser un texto');
  }
  const limpio = (slug ?? '').trim().toLowerCase();
  const clave = limpio === '' ? SLUG_DEFAULT : limpio;

  const perfil = catalogo.get(clave);
  if (!perfil) {
    throw errorSlug(`productoSlug "${clave}" no existe. Disponibles: ${[...catalogo.keys()].join(', ')}`);
  }
  return perfil;
}

/** Metadatos para poblar el <select> del frontend (GET /api/productos). */
function listarProductos() {
  return [...catalogo.values()]
    .map(({ slug, nombre, icono, descripcion }) => ({ slug, nombre, icono, descripcion }))
    .sort((a, b) => a.nombre.localeCompare(b.nombre, 'es'));
}

module.exports = { cargarPerfil, listarProductos };