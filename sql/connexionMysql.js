/*
Gérer la connexion à la database
*/

let mysql = require('mysql');

let connexionData =
{
    host:'localhost',
    user:'root',
    password:'root',
};


let connexion = mysql.createConnection(connexionData)

connexion.connect((err)=>
{
    if(err) throw err;
    console.log("database connection OK")
});

module.exports = connexion
