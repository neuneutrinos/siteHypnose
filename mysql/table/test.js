let tableTools = require('../tools')

let table = new tableTools.Table('test');



table.putField('plop',tableTools.Field.create('int'))

module.exports = table