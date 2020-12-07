let connection = require('./mysqlConnection')

let databaseName = 'hypnose'

console.log('purge de la database')

connection.query('drop database if exists '+databaseName,(err)=>
{
    if(err)
    {
        console.log("erreur drop database")
        throw err;
    }
})

console.log('creation de la database')

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

console.log('creation des tables')

let allTable = require('./allTable');
const table = require('./table/user')

//console.log("create query =>\n ",allTable['test'].buildCreateTableRequest('test'))

for(let tablename in allTable)
{
    connection.query(allTable[tablename].buildCreateTableRequest(tablename),(err)=>
    {
        if(err===null)return;
        console.error('erreur création table',err)
        throw err
    })
    console.log(allTable[tablename].buildCreateTableRequest(tablename))
}

connection.beginTransaction((err)=>
{
    if(err)
    {
        console.log('erreur transaction create tables')
        throw err;
    }
})

console.log('fin creation table')