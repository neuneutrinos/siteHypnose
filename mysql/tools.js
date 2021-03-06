let uuid =require('uuid');
const connection = require('./mysqlConnection');

let arrayTools = require('../tools/array/tools');
const { query } = require('./mysqlConnection');
/* 
Création de table et génération de requète SQL
Ne gère pas les dépendances, juste le stockages des propriétés et la génération de code sql
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

    static TypeSQL =
    {
        typeID : 'varchar(36)',
        entier : 'int',
        Date : 'datetime',
        smallString : 'varchar(32)',
        bigString : 'nvarchar',
    }

    static primaryKey = new Field(Field.TypeSQL.typeID,['primary key'])
    static foreignKey = new Field(Field.TypeSQL.typeID,[])

}

module.exports.Field = Field

//private ------------------------------------------
var buildFieldQuery = (fieldname,field)=>
{
    var str = `\t${fieldname}\t${field.type}\t`;
    for(var c of field.constraints)
        str+=' '+c+' '
    return str;
}

var buildForeignKey = (tablename,ref,tableRef)=>
{
    var str=''
    if(ref == '')ref = `${tableRef}_id`
    str+=',\n'+buildFieldQuery(ref,Field.foreignKey)+','
    str+=`constraint fk_${tablename}_${ref}_ref_${tableRef} foreign key (${ref}) references ${tableRef}(id)`

    return str;
}

module.exports.Table = class Table
{
    constructor(name=null)
    {
        this.name=name;
        this.fields={id:Field.primaryKey}//set of fields
        this.foreignkeys = {}//set of foreign keys
    }

    putField(name,field)
    {
        this.fields[name] = field;
    }

    putForeignKey(table,nameRef=null,)
    {
        let tablename = table.name;
        if(nameRef===null)
        {
            nameRef = tablename+'_id'
        }
        this.foreignkeys[nameRef] = tablename
    }





    //when all fields are set
    buildCreateTableRequest()
    {
        let tablename = this.name
        var query = `create table ${tablename}\n(\n`;
        //embedded function ti create part of query

        //write fields
        let nbFields = Object.keys(this.fields).length;
        let index=0
        for( var fieldname in this.fields)
        {
            index++
            query+=buildFieldQuery(fieldname,this.fields[fieldname]);
            if(index<nbFields)
            {
                query+=',\n'
            }
            //write foreign key
        }
        index=0
        for(var ref in this.foreignkeys)
        {
            query+='\t'+buildForeignKey(this.name,ref,this.foreignkeys[ref])
        }
        query+='\n)'

        //constraint fk_truc foreign key (nomChamps) references tablename(id)
        return query
    }
}

class CrudBaseQuery //create, read, update , delete
{

    constructor(table)
    {
        this.tableData = table;
    }

    //select * from <table> where <predicate>
    readAllQuery(where=null)
    {
        let query = `select * from ${this.tableData.name}`;
        if(where)query+=` where ${where}`
        return query;
    }

    readByIdQuery()
    {
        return this.readAllQuery('id = ?')
    }

    createOrUpdateQuery(elem)
    {
        if(!(elem.id || elem.id === uuid.NIL))//update
        {
            elem.id = uuid.v4()
        }
        //map elem 
        let lstValue = Object.values(elem).map((v,i)=>
        {
            return (v!==null && typeof v !== 'number')? "'"+v+"'" : v
        })
        let lstKey = [...Object.keys(this.tableData.fields),...Object.keys(this.tableData.foreignkeys)]
        let query = `replace into ${this.tableData.name} (${arrayTools.formatArrayToParameterString(lstKey)}) values (${arrayTools.formatArrayToParameterString(lstValue)})`
        return query
    }   
    /*DELETE FROM `utilisateur`
      WHERE `id` = 1
    */
    deleteQuery()
    {
        query = `DELETE FROM ${this.tableData.name} WHERE id = ?`
        return query;
    }

}

module.exports.CrudBaseQuery = CrudBaseQuery

