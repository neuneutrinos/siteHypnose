let express = require('express');
require('./test')
let createDatabase = require('./mysql/createDatabase');
var path = require('path');

//fonction qui remet à 0 la base de donnée, à commenter si besoin pour éviter de recréer à chaque sauvegarde
//createDatabase.recreateDatabase('hypnose')

let app = express();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/front/vue'));


app.get('/reset',(req,res)=>
{
    createDatabase.recreateDatabase('hypnose')
})


app.get('/',(req,res)=>
{
  res.render('index', {titre : 'BAHD'});
})


app.get('/test/:controller/:view/:id',(req,res)=>
{
    str = '<p>controller ='+req.params.controller+'</p><p>view ='+req.params.view+'</p><p>id ='+req.params.id+'</p>';
    res.send(str);
    res.end();
})
app.listen(8080)
