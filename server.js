// server.js
require('dotenv').config();
const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Configuración de conexión a PostgreSQL (Render)
const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // Render la provee automáticamente
  ssl: { rejectUnauthorized: false } // necesario en Render
});

// Verificar conexión
pool.connect()
  .then(() => console.log('✅ Conectado correctamente a PostgreSQL en Render'))
  .catch((err) => console.error('❌ Error de conexión a PostgreSQL:', err.message));

// Endpoint principal
app.get('/', (req, res) => {
  res.send('API activa con PostgreSQL 🚀');
});

// Endpoint para traer usuarios
app.get('/api/users', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM users ORDER BY id ASC');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Iniciar servidor
const PORT = process.env.PORT || 1337;
app.listen(PORT, () => console.log(`🌐 Servidor escuchando en puerto ${PORT}`));
