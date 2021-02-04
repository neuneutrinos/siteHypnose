require('./test')
let createDatabase = require('./mysql/createDatabase');
var path = require('path');
// Standard FIPS 202 SHA-3 implementation
const { SHA3 } = require('sha3');
const hash = new SHA3(512);
const { CrudBaseQuery } = require('./mysql/tools');
const tables = require('./mysql/allTable');
const connection = require('./mysql/mysqlConnection');

//fonction qui remet à 0 la base de donnée, à commenter si besoin pour éviter de recréer à chaque sauvegarde
//createDatabase.recreateDatabase('hypnose')

let app = require('./application/app')

require('./Route/Ressource/cssRoute')
require('./Route/Ressource/imageRoute')
require('./Route/Ressource/jsRoute')


app.listen(8080);
