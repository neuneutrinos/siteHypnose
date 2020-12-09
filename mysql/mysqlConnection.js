console.log('chargement de mysqlConnection')

let mysql = require('mysql')

//default
connectionData =
{
    host:'localhost',
    user:'root',
    password:'root',
};

var connection = mysql.createConnection(connectionData);

connection.connect();

module.exports = connection;