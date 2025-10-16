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
(async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        firstName VARCHAR(32) NOT NULL,
        lastName VARCHAR(32) NOT NULL,
        document VARCHAR(16) UNIQUE NOT NULL,
        address VARCHAR(64),
        phone VARCHAR(20),
        email VARCHAR(64)
      );
    `);
    console.log('✅ Tabla users creada o ya existente');

    await pool.query(`
      INSERT INTO users (firstName,lastName,document,address,phone,email) VALUES
      ('Vilma','Gómez','313233','Av 39 # 2129','300214578','vilma@correo.com'),
      ('Juan','Pérez','900111','Cra 10 # 12-34','310000001','juanp@example.com'),
      ('María','López','900112','Cll 80 # 15-20','311000002','mlopez@example.com'),
      ('Andrés','Rojas','900113','Cra 68 # 90-30','312000003','arojas@example.com'),
      ('Paula','Díaz','900114','Av Suba # 100-12','313000004','pdiaz@example.com'),
      ('Camilo','Suárez','900115','Cll 26 # 30-45','314000005','csuarez@example.com')
      ON CONFLICT (document) DO NOTHING;
    `);
    console.log('✅ Datos iniciales insertados');
  } catch (err) {
    console.error('❌ Error creando tabla:', err.message);
  }
})();
