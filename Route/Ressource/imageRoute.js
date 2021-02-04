const ConstantePath = require('../../Constante/Path')
const path = require('path')
const fs = require('fs')

var app = require('../../application/app')


app.get('/image/:dir?/:file.:ext',(req,res)=>
{
    ext = ['jpeg','jpg','png']
    
    if(req.params.dir)req.params.file = path.join(req.params.dir,req.params.file);

    file = path.join(ConstantePath.RESSOURCE_PATH_IMG,req.params.file+'.'+req.params.ext);
    if(ext.includes(req.params.ext) && fs.existsSync(file))
        res.sendFile(file);
    else
    {
        res.status(404)
        res.end()
    }
})