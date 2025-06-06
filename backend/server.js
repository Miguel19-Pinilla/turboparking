// C:\Users\Miguel\turboparking\backend\server.js
const express = require('express');
const cors = require('cors');
const pool = require('./config/db'); // Importa el pool de conexión a la base de datos

// Carga las variables de entorno desde .env
require('dotenv').config(); // Asegúrate de que tienes un archivo .env en la raíz de tu backend

// Importa las rutas
const perfilRoutes = require('./routes/perfilRoutes');
const vehiculoRoutes = require('./routes/vehiculoRoutes');
const authRoutes = require('./routes/authRoutes'); // Nueva importación para las rutas de autenticación

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware para habilitar CORS
app.use(cors({
  origin: 'http://localhost:3000', // O la URL de tu frontend si no es localhost:3001
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'], // Asegúrate de permitir 'Authorization' para los JWT
}));

// Middleware para parsear JSON en el cuerpo de las peticiones
app.use(express.json());

// --- MIDDLEWARE DE DEPURACIÓN ---
// Este middleware registrará cada petición que llega a tu servidor Express
app.use((req, res, next) => {
  console.log(`Backend: Petición recibida - Método: ${req.method}, URL: ${req.url}, Origen: ${req.headers.origin || 'Desconocido'}`);
  next(); // Es crucial llamar a next() para que la petición continúe al siguiente middleware/ruta
});
// --- FIN MIDDLEWARE DE DEPURACIÓN ---

// --- Rutas de la API ---

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('Backend de TurboParking funcionando!');
});

// Montaje de rutas
// Las rutas se montan bajo '/api' para que las sub-rutas (ej. /perfiles, /perfil/:id)
// definidas en perfilRoutes.js y vehiculoRoutes.js sean accesibles correctamente.
app.use('/api', perfilRoutes);
app.use('/api', vehiculoRoutes);
app.use('/api/auth', authRoutes); // Monta las rutas de autenticación bajo /api/auth

// Manejador de errores global (opcional pero bueno para la depuración)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Algo salió mal!');
});

// Iniciar el servidor
// *** CAMBIO CLAVE AQUÍ: Especificar '0.0.0.0' para escuchar en todas las interfaces ***
app.listen(PORT, '0.0.0.0', () => { 
  console.log(`Backend de TurboParking corriendo en http://0.0.0.0:${PORT}`); // Cambia el log para reflejar el cambio
  console.log('Conectado a la base de datos PostgreSQL.');
});

// Manejo de errores de conexión a la base de datos (opcional, pero buena práctica)
pool.on('error', (err) => {
  console.error('Error inesperado en el pool de la base de datos:', err);
  process.exit(-1); // Salir del proceso si hay un error crítico de DB
});
