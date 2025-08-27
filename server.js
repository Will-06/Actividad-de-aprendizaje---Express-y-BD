// Importamos el módulo 'express', que nos permite crear un servidor web de forma sencilla
const express = require('express');

// Importamos el módulo 'mysql' para poder conectarnos a la base de datos MySQL
const mysql = require('mysql');

// Creamos una aplicación de Express
const app = express();

// Definimos el puerto en el que va a correr nuestro servidor (localhost:3000)
const PORT = 3000;

// Configuramos la conexión a la base de datos MySQL
const connection = mysql.createConnection({
  host: 'localhost',   // Dirección del servidor MySQL (en este caso, local)
  user: 'root',        // Usuario de MySQL (por defecto, suele ser 'root')
  password: '',        // Contraseña del usuario (vacía si no tiene)
  database: 'tienda'   // Nombre de la base de datos que vamos a utilizar
});

// Nos conectamos a la base de datos MySQL
connection.connect(err => {
  if (err) {
    // Si hay un error en la conexión, lo mostramos en la consola
    console.error('Error conectando a MySQL:', err);
    return;
  }
  // Si la conexión es exitosa, mostramos un mensaje
  console.log('Conectado a MySQL');
});

// Creamos la ruta principal del servidor (http://localhost:3000/)
app.get('/', (req, res) => {
  // Cuando alguien accede a la raíz, enviamos un saludo como respuesta
  res.send('Hola desde express');
});

// Creamos una ruta para obtener los productos desde la base de datos
app.get('/productos', (req, res) => {
  // Hacemos una consulta SQL para obtener todos los productos
  connection.query('SELECT * FROM productos', (err, results) => {
    if (err) {
      // Si hay un error al hacer la consulta, lo mostramos y respondemos con un error 500
      console.error('Error al consultar productos:', err);
      return res.status(500).send('Error en la consulta');
    }
    // Si la consulta es exitosa, enviamos los resultados en formato JSON
    res.json(results);
  });
});

// Iniciamos el servidor para que escuche en el puerto que definimos
app.listen(PORT, () => {
  // Mostramos en la consola que el servidor está corriendo
  console.log(`corriendo en el puerto ${PORT}`);
});
