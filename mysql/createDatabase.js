let connection = require('./mysqlConnection')
let DTO = require('./DTO/dto')

let databaseName = 'hypnose'

var isCreated=false

//console.log('purge de la database')

function clearDatabase(databaseName)
{
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
}

function createAllTable()
{
    let allTable = require('./allTable');
    let allData =  require('./allDatas')
    let CrudQuery = require('./tools').CrudBaseQuery

    //transction ?
    connection.beginTransaction(err=>
    {
    if(err)
    {
        connection.rollback(err=>{if(err)throw err})
        throw err;
    }
    for(let table of allTable)
    {

        let query = table.buildCreateTableRequest();
        connection.query(query,(err,result)=>
        {
            let t = table;
            if(err)
            {
                connection.rollback(err=>{if(err)throw err})
                throw err;
            }
            //console.log('\x1b[36m%s\x1b[0m', 'I am cyan');
            connection.dto[t.name] = new DTO(t,connection)
            console.log(`table\t\x1b[36m${table.name}\x1b[0m  created`)
        })
        //initialisaton
        for(elem of allData[table.name])
        {
            let q = new CrudQuery(table)
            query =  q.createOrUpdateQuery(elem)
            connection.query(query,(err,result)=>
            {
                if(err)
                {connection.rollback(err=>{if(err)throw err})
                throw err;
                }
            })
        }
    
    }
    connection.commit(err=>
    {
        if(err)throw err
        isCreated = true
        console.log('all table created')
    })
    
    })
}



//console.log('creation des tables')



//while(!isCreated)console.log(isCreated)
module.exports.clearDatabase = clearDatabase
module.exports.createAllTable = createAllTable

module.exports.recreateDatabase = function(databaseName)
{
    clearDatabase(databaseName)
    createAllTable()
}

module.exports.isCreated = isCreated
