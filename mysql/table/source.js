let tableTools = require('../tools')



let table = new tableTools.Table('source');

table.putField('titre',tableTools.Field.create(tableTools.Field.TypeSQL.smallString))
table.putField('auteur',tableTools.Field.create(tableTools.Field.TypeSQL.smallString))
table.putField('date',tableTools.Field.create(tableTools.Field.TypeSQL.Date))
table.putField('description',tableTools.Field.create(tableTools.Field.TypeSQL.Date))
table.putField('ref_source',tableTools.Field.create(tableTools.Field.TypeSQL.entier))
table.putField('etat',tableTools.Field.create(tableTools.Field.TypeSQL.smallString))
table.putField('type',tableTools.Field.create(tableTools.Field.TypeSQL.entier))


module.exports = table
