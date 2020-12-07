let fs = require('fs')

var allTable={};


fs.readdirSync('./mysql/table').forEach(file => 
{
    let name=file.split('.')[0]
    allTable[name]=require('./table/'+file)
});


module.exports = allTable;