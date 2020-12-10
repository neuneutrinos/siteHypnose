let tableTools = require('../tools')



let table = new tableTools.Table('permission');

table.putField('flag',tableTools.Field.create(tableTools.Field.TypeSQL.entier))
table.putForeignKey(require('./utilisateur'))

module.exports = table
