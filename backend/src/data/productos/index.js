const fs = require('fs');
const path = require('path');
const ProductoAgricola = require('../../models/ProductoAgricola');

function congelarProfundo(obj) {
  Object.values(obj).forEach((v) => {
    if (v && typeof v === 'object') congelarProfundo(v);
  });
  return Object.freeze(obj);
}

/**
 * @param {string} [dir] carpeta a leer (parametrizable para poder probar casos inválidos)
 * @returns {Map<string, Object>} slug -> perfil congelado
 */
function cargarCatalogo(dir = __dirname) {
  const archivos = fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.js') && f !== 'index.js' && !f.startsWith('_'))
    .sort();

  const catalogo = new Map();
  const errores = [];

  for (const archivo of archivos) {
    const esperado = path.basename(archivo, '.js');
    let perfil;
    try {
      perfil = require(path.join(dir, archivo));
    } catch (e) {
      errores.push(`${archivo}: no se pudo cargar (${e.message})`);
      continue;
    }
    if (perfil.slug !== esperado) {
      errores.push(`${archivo}: slug "${perfil.slug}" debe coincidir con el nombre del archivo ("${esperado}")`);
    }
    const erroresEsquema = ProductoAgricola.validarPerfil(perfil);
    if (erroresEsquema.length) {
      errores.push(`${archivo}: ${erroresEsquema.join(' | ')}`);
    }
    catalogo.set(esperado, perfil);
  }

  if (errores.length) {
    throw new Error(`Catálogo de productos inválido:\n - ${errores.join('\n - ')}`);
  }
  catalogo.forEach((perfil) => congelarProfundo(perfil));
  return catalogo;
}

module.exports = { cargarCatalogo };