import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:4000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

// Fincas
export const listarFincas = () => api.get('/fincas').then((r) => r.data);
export const crearFinca = (finca) => api.post('/fincas', finca).then((r) => r.data);
export const eliminarFinca = (id) => api.delete(`/fincas/${id}`).then((r) => r.data);

// Plantas de procesamiento
export const listarPlantas = () => api.get('/plantas').then((r) => r.data);
export const crearPlanta = (planta) => api.post('/plantas', planta).then((r) => r.data);
export const eliminarPlanta = (id) => api.delete(`/plantas/${id}`).then((r) => r.data);

// Evaluación de rutas
// NOTA: el backend lee `productoSlug` (no `producto`); si se omite, cae a 'cafe'.
export const evaluarRutas = (origen, destino, fincaId, plantaId, productoSlug = 'cafe') =>
  api.post('/rutas/evaluar', {
    origen,
    destino,
    fincaId,
    plantaId,
    productoSlug,
  }).then((r) => r.data);

export const evaluarRutasPorIds = (fincaId, plantaId, productoSlug = 'cafe') =>
  api.post('/rutas/evaluar-por-ids', {
    fincaId,
    plantaId,
    productoSlug,
  }).then((r) => r.data);

export const obtenerHistorial = () => api.get('/rutas/historial').then((r) => r.data);

export default api;