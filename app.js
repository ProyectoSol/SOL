var express = require('express');
var mongoose = require('mongoose');
var app = express();
var bodyParser = require('body-parser');
//var Mailgun = require('mailgun').Mailgun;
//var mg = new Mailgun('key-895d8c83afc89fdfe4dbbc0f77914001');

// database connection
mongoose.connect('mongodb://sol:sol@ds053954.mongolab.com:53954/proyectosol');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback() {
	console.log('Se ha conectado correctamente con la base de datos :D');
});

app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));
app.use(express.urlencoded()); // to support URL-encoded bodies

app.use(express.static(__dirname +'/public'));

app.get('/', function(req, res) {
    res.redirect('index.html');
});

var usuariov;
var emailv;
var passv;
var pass2v;

var usuarioEsquema = mongoose.Schema({
    usuario: String,
    email: String,
    pass: String
},{ collection : 'usuario' });

// model
var User = mongoose.model('User', usuarioEsquema);
/*
app.post('/insert', function(req, res) {
   console.log(usuariov);
   res.send('Usu+
   ario: ' + usuariov+" email: "+emailv+" pass: "+passv+" pass2: "+pass2v);
   
});
*/
app.post('/insert/usuario', function(req, res){
    usuariov = req.body.usuario;
    emailv = req.body.email;
    passv = req.body.pass;
    pass2v = req.body.pass2;
    
    if(passv == pass2v){
      var usuarioNuevo = new User({ usuario: usuariov, email: emailv, pass: passv });
      console.log(usuarioNuevo.usuario);
    
      usuarioNuevo.save(function (err, anadirusuario, numberAffected) {
        if (err) {
          console.error(err);
          res.send('Error');
        } else {
          console.log('usuario creado:');
          console.log(anadirusuario);
          res.json(anadirusuario);
        }
      });
    }else{
      console.log("las contraseñas deben ser iguales");
      res.redirect('/index.html');
    }
  
});

/*
mg.sendText('deivoz14@gmail.com', ['Recipient 1 <deivoz14@gmail.com>', 'deivoz14@gmail.com'],
  'This is the subject',
  'This is the text',
  'deivoz14@gmail.com', {},
  function(err) {
    if (err) console.log('Oh noes: ' + err);
    else     console.log('Success');
});
*/
var server = app.listen(process.env.PORT || 3000, function(){
    console.log('Listening in port %d', server.address().port);
});



