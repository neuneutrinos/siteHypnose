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

    static typeID = 'varchar(36)'
    static primaryKey = new Field(Field.typeID,['primary key'])
    static foreignKey = new Field(Field.typeID,[])
    
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

