const connection = require('../mysqlConnection')

tools = require('../tools')

//basic action to database

class DTO
{
    constructor(table)
    {
     this.crud = new tools.CrudBaseQuery(table)
    }
    
    insert(elem,callback)
    {
        connection.query(this.crud.createOrUpdateQuery(elem),callback)
    }

    update(elem,callback)
    {
        this.insert(elem,callback)
    }

    deleteById(id,callback)
    {
        let query = this.crud.deleteById()
        connection.query(query,id,callback)
    }

}

module.exports = DTO