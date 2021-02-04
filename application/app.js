//retourne l'application web
const path = require('path')

let express = require('express');
const ConstantePath = require('../Constante/Path')

let createDatabase = require(path.join(ConstantePath.ROOT_PATH,'mysql/createDatabase'));

var app = express();
app.set('view engine', 'ejs');
app.set('views',ConstantePath.RESSOURCE_PATH_EJS_ROOT);

//routing par défaut (ou pas encore rangé)?

app.get('/reset',(req,res)=>
{
    createDatabase.recreateDatabase('hypnose')
    res.send('reset')
    res.end()
})

app.get('/',(req,res)=>
{
    res.send('ok')
    res.end()
})


module.exports = app