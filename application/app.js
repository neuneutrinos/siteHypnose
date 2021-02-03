//retourne l'application web
console.log('initialisation de l\'application express')

let express = require('express');
const ConstantePath = require('../Constante/Path')
const path = require('path')

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



module.exports = app