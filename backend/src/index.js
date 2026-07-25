const express = require('express');
const cors = require('cors');
require('dotenv').config();
const db = require('./config/db');
const autosRoutes = require('./routes/autos.routes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Servidor Express corriendo correctamente' });
});

app.use('/api/autos', autosRoutes);

// Iniciar servidor
app.listen(PORT, async () => {
  console.log(` Servidor corriendo en http://localhost:${PORT}`);

  try {
    await db.query('SELECT NOW()');
  } catch (error) {
    console.error('🔴 Error al conectar con PostgreSQL:', error.message);
  }
});