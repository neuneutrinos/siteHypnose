let tableTools = require('../tools')


let table = new tableTools.Table('test');



table.putField('plop',tableTools.Field.create('int'))
table.putForeignKey(table,'parent_id')//self reference
table.putForeignKey(require('./user'))//ref table into user.js 

module.exports = table