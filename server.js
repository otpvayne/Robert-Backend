// server.js
require('dotenv').config();
const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// 🔗 Configuración de conexión (usa variables de entorno)
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT
});

// ✅ Verificar conexión a la base de datos
db.connect((err) => {
  if (err) {
    console.error('❌ Error de conexión a MySQL:', err.message);
  } else {
    console.log('✅ Conectado correctamente a MySQL');
  }
});

// 📡 Endpoint principal
app.get('/', (req, res) => {
  res.send('API activa: /api/users');
});

// 📋 Endpoint que devuelve los usuarios
app.get('/api/users', (req, res) => {
  const sql = 'SELECT id, firstName, lastName, document, address, phone, email FROM users';
  db.query(sql, (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// 🚀 Iniciar servidor
const PORT = process.env.PORT || 1337;
app.listen(PORT, () => {
  console.log(`🚀 Servidor activo en puerto ${PORT}`);
});
