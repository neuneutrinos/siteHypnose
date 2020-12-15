function formatArrayToParameterString(tab,delim=',')
{
    let str='';
    if(tab.length)
    {

        str+=tab[0]
        for(let i=1;i<tab.length;i++)
        {
            str+=delim+tab[i]
        }
    }

    return str;
}

function formatObjectToParameterString(obj)
{
    array = Object.entries(obj).map(([k,v],i)=>`${k} = ${v}`)
    return formatArrayToParameterString(array);
}

module.exports.formatArrayToParameterString = formatArrayToParameterString
module.exports.formatObjectToParameterString = formatObjectToParameterString
