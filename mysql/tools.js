/* 
Création de table et génération de requète SQL
*/

class Field
{
    constructor(type,constraints)
    {
        this.type=type;
        this.constraints = constraints;
    }

    static create(type){return new Field(type,[])}
    static createNotNull(type){return new Field(type,['not null'])}
    static createUnique(type){return new Field(type,['unique'])}
    static createUniqueNotNull(type){return new Field(type,['unique not null'])}

    static primaryKey = new Field('varchar(36)',['primary key'])
}

module.exports.Field = Field

module.exports.Table = class Table
{
    constructor()
    {
        this.fields={id:Field.primaryKey}//set of fields
        this.foreignkeys = {}//set of foreign keys
    }

    putField(name,field)
    {
        this.fields[name] = field;
    }

    putForeignKey(nameRef,tablename)
    {
        this.foreignkeys[nameRef] = tablename
    }

    //when all fields are set
    buildCreateTableRequest(tablename)
    {
        var query = `create table ${tablename}\n(\n`;
        //embedded function ti create part of query
        var buildFieldQuery = (fieldname,field)=>
        {
            var str = `\t${fieldname}\t${field.type}\t`;
            for(var c of field.constraints)
                str+=' '+c+' '
            return str;
        }
        //write fields
        let nbFields = Object.keys(this.fields).length;
        let index=0
        for( var fieldname in this.fields)
        {
            index++
            query+='\t'+buildFieldQuery(fieldname,this.fields[fieldname]);
            if(index<nbFields)
            {
                query+=',\n'
            }
        }
        query+='\n)'
        //---------------
        return query
    }
}