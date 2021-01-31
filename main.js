let express = require('express');
require('./test')
let createDatabase = require('./mysql/createDatabase');
var path = require('path');
const { CrudBaseQuery } = require('./mysql/tools');
const tables = require('./mysql/allTable');
const connection = require('./mysql/mysqlConnection');

//fonction qui remet à 0 la base de donnée, à commenter si besoin pour éviter de recréer à chaque sauvegarde
//createDatabase.recreateDatabase('hypnose')

let app = express();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/front/vue'));


app.get('/reset',(req,res)=>
{
    createDatabase.recreateDatabase('hypnose')
    res.send('reset')
    res.end()
})


app.get('/',(req,res)=>
{
  res.render('index', {titre : 'BAHD'});
})


app.all('/test/table/:action/:tableName/:id?',(req,res)=>
{
  let model = {}
  let table = tables.allTables[req.params.tableName];
  let crud = new CrudBaseQuery(table)
  model.table = tables.allTables[req.params.tableName];

  connection.query(crud.readAllQuery(),(err,resultat)=>
  {
    if(err)
    {
      model.error = error
    }
    else
    {
      model.datas=resultat
    }
      console.log('model.data =',model.datas)
      res.render('test/test_database.ejs',model)
  })

/*
  let query=undefined
  switch(req.params.action)
  {
    case 'create':
      query=crud.createOrUpdateQuery()
      break;
    case 'read':
      break;
    case 'update':
      break;
    case 'delete':
      break;
  }
  */

})


app.listen(8080)
