let fs = require('fs');

/*
class d'arbre de dépendance
*/
var allDatas={};

//chargement de toutes les datas
fs.readdirSync('./mysql/insertions').forEach(file =>
{
    let data = require('./insertions/'+file)
    let name=file.split('.')[0]
    allDatas[name]=data
});

module.exports = allDatas
