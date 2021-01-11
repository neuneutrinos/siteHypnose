tools = require('../tools')
connection = require('../mysqlConnection')
//basic action to database

class DTO
{
    constructor(table)
    {
     this.crud = new tools.CrudBaseQuery(table)
    }
    
    insert(elem)
    {
        connection.query(this.crud.createOrUpdateQuery(elem),err=>
        {
            if(err)throw err
        })
    }

    update(elem)
    {
        this.insert(elem)
    }

}

module.exports = DTO