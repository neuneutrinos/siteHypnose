let fs = require('fs');
const table = require('./table/test');

/* 
class d'arbre de dépendance
*/
var allTable={};

//chargement de toutes les tables
fs.readdirSync('./mysql/table').forEach(file => 
{
    let table = require('./table/'+file)
    let name=table.name===null?file.split('.')[0]:table.name
    table.name=name;
    allTable[name]=table
});

//orgnisation des dépendances des classes
//1) générer les ref sauf les self reférences
//2) générer la table
var tables = []
var generateOrderSQL = function()
{
 reqAddTable = (table)=>
 {
    for(dep in table.foreignkeys)
    {
        if(table.foreignkeys[dep] != table.name)
        {
            let t = allTable[table.foreignkeys[dep]]
            if(!tables.includes(t))
                reqAddTable(t)
        }
    }
    if(!tables.includes(table))
        tables.push(table)
 }
 //utilisation de la fonction récursive
 for(t in allTable)
    if(!tables.includes(allTable[t]))
        reqAddTable(allTable[t])
}
generateOrderSQL();



module.exports = tables