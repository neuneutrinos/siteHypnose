let express = require('express');
var bodyParser = require('body-parser')
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
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded())


app.get('/reset',(req,res)=>
{
    createDatabase.recreateDatabase('hypnose')
    res.send('reset')
    res.end()
})


app.get('/',(req,res)=>
{
  res.render('signin');
})

app.all('/signin',
  (req, res)=> {
    var username = req.body.username;
    var password = req.body.password;
    res.end()
    console.log("post received:", username, password);
});



app.get('/test/table/select/:tableName/:id?',(req,res)=>
{
  let table = tables.allTables[req.params.tableName];
  let crud = new CrudBaseQuery(table)

  connection.query(crud.readByIdQuery(),(error,result)=>
  {
    result= JSON.stringify(result)

    let str = '<div>'+error+'</div>'
    str+='<div style="color:red">'+result+'</div>'
    res.send(str)
  })


})


app.listen(8080)
