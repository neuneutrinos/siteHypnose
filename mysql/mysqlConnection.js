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

connection.connect(err=>
{
    if(err)throw err
    console.log('connected as id ' + connection.threadId);
});

connection.dto={}

module.exports = connection;