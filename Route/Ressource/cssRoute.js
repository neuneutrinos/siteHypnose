const ConstantePath = require('../../Constante/Path')
const path = require('path')
const fs = require('fs')
var app = require('../../application/app')

app.get('/css/:dir?/:file.css',(req,res)=>
{
    if(req.params.dir)req.params.file = path.join(req.params.dir,req.params.file);
    file = path.join(ConstantePath.RESSOURCE_PATH_CSS,req.params.file+'.css')
    if(fs.existsSync(file))
        res.sendFile(file);
    else
    {
        res.status(404)
        res.end()
    }
})