// db.js
const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'miusuario',
  password: 'mipassword',
  database: 'tienda'
});


connection.connect((error) => {
  if (error) {
    console.error('Error de conexión a la base de datos:', error);
    return;
  }
  console.log('Conectado a la base de datos MySQL/MariaDB');
});

module.exports = connection;
