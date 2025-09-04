// C:\Users\Miguel\turboparking\backend\config\db.js
const { Pool } = require('pg');

// Configura los detalles de tu base de datos PostgreSQL aquí
// Es MUY RECOMENDABLE usar variables de entorno para esto en producción.
// Por ahora, las ponemos directamente para simplicidad.
const pool = new Pool({
  user: 'postgres', // Reemplaza con tu usuario de PostgreSQL
  host: 'localhost',         // O la IP/host donde se ejecuta tu DB
  database: 'postgres',    // Reemplaza con el nombre de tu base de datos
  password: '10010',   // Reemplaza con tu contraseña de PostgreSQL
  port: 5432,                  // El puerto predeterminado de PostgreSQL
});

// Prueba la conexión
pool.connect((err, client, release) => {
  if (err) {
    return console.error('Error al conectar a la base de datos', err.stack);
  }
  console.log('Conectado a la base de datos PostgreSQL');
  release(); // Libera el cliente de vuelta al pool
});

module.exports = pool;