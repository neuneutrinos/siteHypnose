let tableTools = require('../tools')



let table = new tableTools.Table('tag');

table.putField('libelle',tableTools.Field.create(tableTools.Field.TypeSQL.smallString))

module.exports = table
