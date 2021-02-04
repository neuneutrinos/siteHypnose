require('./test')
let createDatabase = require('./mysql/createDatabase');
var path = require('path');
const { CrudBaseQuery } = require('./mysql/tools');
const tables = require('./mysql/allTable');
const connection = require('./mysql/mysqlConnection');

//fonction qui remet à 0 la base de donnée, à commenter si besoin pour éviter de recréer à chaque sauvegarde
//createDatabase.recreateDatabase('hypnose')

let app = require('./application/app')

require('./Route/Ressource/cssRoute')
require('./Route/Ressource/imageRoute')
require('./Route/Ressource/jsRoute')






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
})



app.listen(8080)
