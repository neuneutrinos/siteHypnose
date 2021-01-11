let tableTools = require('../tools')

let table = new tableTools.Table('message');
table.putForeignKey(require('./utilisateur'))
table.putField('date_creation',tableTools.Field.create(tableTools.Field.TypeSQL.Date))
table.putField('titre',tableTools.Field.create(tableTools.Field.TypeSQL.smallString))
table.putField('ref_article',tableTools.Field.create(tableTools.Field.TypeSQL.smallString))
table.putField('derniere_modif',tableTools.Field.create(tableTools.Field.TypeSQL.Date))



module.exports = table
