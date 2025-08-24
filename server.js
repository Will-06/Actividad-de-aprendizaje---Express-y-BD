// server.js
const express = require('express');
const app = express();
const port = 3000;
const db = require('./db');

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Servidor Express funcionando');
});

// Ruta para obtener productos
app.get('/productos', (req, res) => {
  db.query('SELECT * FROM productos', (err, results) => {
    if (err) {
      console.error('Error al obtener productos:', err);
      res.status(500).json({ error: 'Error en la base de datos' });
    } else {
      res.json(results);
    }
  });
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
