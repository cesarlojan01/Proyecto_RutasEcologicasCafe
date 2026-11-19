require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./src/config/db');

const fincasRoutes = require('./src/routes/fincas.routes');
const plantasRoutes = require('./src/routes/plantas.routes');
const rutasRoutes = require('./src/routes/rutas.routes');
const ordenamientoRoutes = require('./src/routes/ordenamiento.routes');
const dijkstraRoutes = require('./src/routes/dijkstra.routes');

const app = express();

// Middlewares
app.use(cors({ origin: process.env.FRONTEND_URL || '*' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Conexión a la base de datos (no bloquea el arranque si falla, solo avisa)
connectDB();

// Rutas de la API
app.use('/api/fincas', fincasRoutes);
app.use('/api/plantas', plantasRoutes);
app.use('/api/rutas', rutasRoutes);
app.use('/api/ordenamiento', ordenamientoRoutes);
app.use('/api/dijkstra', dijkstraRoutes);

// Endpoint de salud
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', servicio: 'Ruta Ecológica Café API', fecha: new Date().toISOString() });
});

// Manejo de errores centralizado
app.use((err, req, res, next) => {
  console.error('Error no controlado:', err);
  res.status(err.status || 500).json({
    error: true,
    mensaje: err.message || 'Error interno del servidor',
  });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚚☕ Servidor de Ruta Ecológica Café escuchando en el puerto ${PORT}`);
});
