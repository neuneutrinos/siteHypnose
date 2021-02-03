const ConstantePath = require('../../Constante/Path')
const path = require('path')
var app = require('../../application/app')

app.get('/css/:file.css',(req,res)=>
{
    file = path.join(ConstantePath.RESSOURCE_PATH_CSS,req.params.file+'.css')
    console.log('load '+file)
    res.sendFile(path.join(ConstantePath.RESSOURCE_PATH_CSS,req.params.file+'.css'))
})