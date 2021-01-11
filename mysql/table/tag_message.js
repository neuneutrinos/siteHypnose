let tableTools = require('../tools')



let table = new tableTools.Table('tag_message');

table.putForeignKey(require('./message'))
table.putForeignKey(require('./tag'))


module.exports = table
