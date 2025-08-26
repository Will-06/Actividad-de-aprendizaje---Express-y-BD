const express = require('express');
const mysql = require('mysql');
const app = express();

const PORT = 3000;

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',   
  password: '', 
  database: 'tienda'
});

connection.connect(err => {
  if (err) {
    console.error('Error conectando a MySQL:', err);
    return;
  }
  console.log('Conectado a MySQL');
});

app.get('/', (req, res) => {
  res.send('Hola desde express');
});

app.get('/productos', (req, res) => {
  connection.query('SELECT * FROM productos', (err, results) => {
    if (err) {
      console.error('Error al consultar productos:', err);
      return res.status(500).send('Error en la consulta');
    }
    res.json(results);
  });
});

app.listen(PORT, () => {
  console.log(`corriendo en el puerto ${PORT}`);
});

//