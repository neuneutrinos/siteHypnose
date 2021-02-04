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


app.get('/',(req,res)=>
{
  res.render('signin');
})
app.all('/signin',
  (req, res)=> {
    var pseudo = req.body.username;
    var password = req.body.password;
    res.end()
    console.log(pseudo);
    var sql="SELECT * FROM utilisateur WHERE pseudo= ? and password = ?";
    connection.query(sql, [pseudo, password],(err, res)=>
      {
          if (err) throw err
          console.log (res);
         if (res.length > 0) {
           console.log("Utilisateur existe déjà ")
         }
         else {
           console.log("Utilisateur non trouvé")


         }
      }
  )
    /*let compare = (pseudo, username) => {
      if (pseudo === body.username ) {
        console.log("L'username entré et l'username en bdd sont identiques")
      } else {
        console.log("L'username entré et l'username en bdd ne correspondent pas")


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
