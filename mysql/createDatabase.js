let connection = require('./mysqlConnection')

let databaseName = 'hypnose'

//console.log('purge de la database')

connection.query('drop database if exists '+databaseName,(err)=>
{
    if(err)
    {
        console.log("erreur drop database")
        throw err;
    }
})

//console.log('creation de la database')

connection.query('create database '+databaseName,(err)=>
{
    if(err)
    {
        console.log("erreur create database")
        throw err;
    }
})

connection.changeUser({database : databaseName}, function(err)
{
    if(err===null)return;
    console.log('erreur changement de database',err)
    throw err;
});

//console.log('creation des tables')

let allTable = require('./allTable');
//transction ?
for(let table of allTable)
{
    let query = table.buildCreateTableRequest();
    connection.query(query,(err,result)=>
    {
        let t = table;
        if(err!==null)throw err;
        console.log(`table ${t.name} created`)

    })
}

//tst
let tools = require('./tools')
tabletest = require('./table/test')

crud = new tools.CrudBaseQuery(require('./table/test'),connection)
crud.createOrUpdateQuery({id:'AFGC-ZBFEI-OEFBOE-EBFE',plop:'ploplop',parent_id:null,user_id:null})