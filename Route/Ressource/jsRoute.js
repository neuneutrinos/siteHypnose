const ConstantePath = require('../../Constante/Path')
const path = require('path')
const fs = require('fs')

var app = require('../../application/app')

console.log('routage ressource css');

app.get('/image/:file.js',(req,res)=>
{
    file = path.join(ConstantePath.RESSOURCE_PATH_JS,req.params.file+'.js');
    if(fs.existsSync(file))
        res.sendFile(file);
    else
    {
        res.status(404)
        res.end()
    }
})