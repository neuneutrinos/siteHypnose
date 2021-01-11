let tableTools = require('../tools')



let table = new tableTools.Table('message_source');

table.putForeignKey(require('./message'))
table.putForeignKey(require('./source'))



module.exports = table
