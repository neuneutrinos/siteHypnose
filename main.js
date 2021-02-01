let express = require('express');
var bodyParser = require('body-parser')
require('./test')
let createDatabase = require('./mysql/createDatabase');
var path = require('path');
// Standard FIPS 202 SHA-3 implementation
const { SHA3 } = require('sha3');
const hash = new SHA3(512);
const { CrudBaseQuery } = require('./mysql/tools');
const tables = require('./mysql/allTable');
const connection = require('./mysql/mysqlConnection');

//fonction qui remet à 0 la base de donnée, à commenter si besoin pour éviter de recréer à chaque sauvegarde
//createDatabase.recreateDatabase('hypnose')

let app = express();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/front/vue'));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded())
const http = require('http').Server(app);


app.get('/reset',(req,res)=>
{
    createDatabase.recreateDatabase('hypnose')
    res.send('reset')
    res.end()
})

app.get('/',(req,res)=>
{
  res.render('signin');
})
/*app.all('/signin',
  (req, res)=> {
    var pseudo = req.body.username;
    var password = req.body.password;
    res.end()
    var sql="SELECT * FROM utilisateur WHERE pseudo= ? and password = ?";
    connection.query (sql, [pseudo, password],(err, res)=>
      {
        if (err) throw err
         console.log(res);
      }
  )
    /*let compare = (username, username) => {
      if (username === body.username ) {
        console.log("L'username entré et l'username en bdd sont identiques")
      } else {
        console.log("L'username entré et l'username en bdd ne correspondent pas")

      }
    }

});*/


/*Tuto Passport*/

//login script from here

var flash    = require('connect-flash');
var crypto   = require('crypto');
/* Login script */
var passport = require('passport');
var LocalStrategy  = require('passport-local').Strategy;
 var sess  = require('express-session');
 var Store = require('express-session').Store
var BetterMemoryStore = require('session-memory-store')(sess);
 var store = new BetterMemoryStore({ expires: 60 * 60 * 1000, debug: true })
 app.use(sess({
    name: 'JSESSION',
    secret: 'MYSECRETISVERYSECRET',
    store:  store,
    resave: true,
    saveUninitialized: true
}));

// uncomment after placing your favicon in /public
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

//passport Strategy -- the express session middleware before calling passport.session()
passport.use('local', new LocalStrategy({
  usernameField: 'pseudo',
  passwordField: 'password',
  passReqToCallback: true //passback entire req to call back
} , function (req, pseudo, password, done){
      console.log(pseudo+' = '+ password);
      if(!pseudo || !password ) { return done(null, false, req.flash('message','All fields are required.')); }
      var salt = '7fa73b47df808d36c5fe328546ddef8b9011b2c6';
      connection.query("select * from utilisateur where pseudo = ?", [pseudo], function(err, rows){
          console.log(err);
        if (err) return done(req.flash('message',err));

        if(!rows.length){ return done(null, false, req.flash('message','Invalid username or password.')); }
        salt = salt+''+password;
        var encPassword = crypto.createHash('sha1').update(salt).digest('hex');
        var dbPassword  = rows[0].password;

        if(!(dbPassword == encPassword)){
            return done(null, false, req.flash('message','Invalid username or password.'));
         }
         req.session.user = rows[0];
        return done(null, rows[0]);
      });
    }
));

passport.serializeUser(function(user, done){
    done(null, user.id);
});

passport.deserializeUser(function(id, done){
    connection.query("select * from utilisateur where id = "+ id, function (err, rows){
        done(err, rows[0]);
    });
});

app.get('/signin', function(req, res){
  res.render('login/index',{'message' :req.flash('message')});
});

app.post("/signin", passport.authenticate('local', {
    successRedirect: '/users',
    failureRedirect: '/signin',
    failureFlash: true
}), function(req, res, info){
    res.render('login/index',{'message' :req.flash('message')});
});

app.get('/logout', function(req, res){
    req.session.destroy();
    req.logout();
    res.redirect('/signin');
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

/*Fin des trucs de passport*/
app.get('/test/table/select/:tableName/:id?',(req,res)=>
{
  let table = tables.allTables[req.params.tableName];
  let crud = new CrudBaseQuery(table)

  connection.query(crud.readByIdQuery(),(error,result)=>
  {
    result= JSON.stringify(result)

    let str = '<div>'+error+'</div>'
    str+='<div style="color:red">'+result+'</div>'
    res.send(str)
  })


})


//app.listen(8080)
http.listen(8080, () => {
  console.log('listening on *:8080');
});
