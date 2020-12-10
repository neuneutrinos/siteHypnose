tools = require('./tools/array/tools')

let tab = {x:'aa',y:'ab',z:'ac','?':'da'}

console.log('TOOLS =>',tools.formatObjectToParameterString(tab) )