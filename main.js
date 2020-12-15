let express = require('express');
require('./test')
require('./mysql/createDatabase');

let app = express();

app.get('/',(req,res)=>
{
    res.send('test : req ='+req);
})

app.get('/test/:controller/:view/:id',(req,res)=>
{
    str = '<p>controller ='+req.params.controller+'</p><p>view ='+req.params.view+'</p><p>id ='+req.params.id+'</p>';
    res.send(str);
    res.end();
})



app.listen(8080)