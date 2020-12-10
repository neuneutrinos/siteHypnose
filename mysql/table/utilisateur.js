let tableTools = require('../tools')



let table = new tableTools.Table('utilisateur');

table.putField('pseudo',tableTools.Field.create(tableTools.Field.TypeSQL.smallString))
table.putField('password',tableTools.Field.create(tableTools.Field.TypeSQL.smallString))
table.putField('mail',tableTools.Field.create(tableTools.Field.TypeSQL.smallString))
table.putField('date_creation',tableTools.Field.create(tableTools.Field.TypeSQL.Date))
table.putField('etat_compte',tableTools.Field.create(tableTools.Field.TypeSQL.entier))
table.putField('metier',tableTools.Field.create(tableTools.Field.TypeSQL.smallString))

module.exports = table
