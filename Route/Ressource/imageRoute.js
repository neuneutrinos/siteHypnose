const ConstantePath = require('../../Constante/Path')
const path = require('path')
const fs = require('fs')

var app = require('../../application/app')

console.log('routage ressource css');

app.get('/image/:file.:ext',(req,res)=>
{
    ext = ['jpeg','jpg','png']
    res.contentType('jpeg')
    file = path.join(ConstantePath.RESSOURCE_PATH_IMG,req.params.file+'.'+req.params.ext);
    if(fs.existsSync(file))
        res.sendFile(file);
    else
    {
        res.status(404)
        res.end()
    }
})