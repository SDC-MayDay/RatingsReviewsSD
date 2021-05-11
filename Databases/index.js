const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'MyNewPass',
  database: 'RatingsReviews',
});

connection.connect();

module.exports = connection;
