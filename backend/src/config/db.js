const { Pool } = require('pg');
require('dotenv').config();

// Configuración del Pool usando las variables del archivo .env
const pool = new Pool({
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'mi_base_de_datos',
  password: process.env.DB_PASSWORD || 'postgrespassword',
  port: parseInt(process.env.DB_PORT || '5433', 10),
});

// Evento opcional: confirma en consola cuando se crea una nueva conexión exitosa
pool.on('connect', () => {
  console.log('🟢 Conectado exitosamente a la base de datos PostgreSQL');
});

// Evento de error en conexiones inactivas
pool.on('error', (err) => {
  console.error('🔴 Error inesperado en el cliente de PostgreSQL:', err);
  process.exit(-1);
});

// Exportamos un método query genérico para usarlo en los controllers
module.exports = {
  query: (text, params) => pool.query(text, params),
  pool,
};