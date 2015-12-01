var express = require('express');
var mongoose = require('mongoose');
var app = express();
var bodyParser = require('body-parser');


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

app.post('/insert/usuario', function(req, res){
    usuariov = req.body.usuario;
    emailv = req.body.email;
    passv = req.body.pass;
    pass2v = req.body.pass2;
    
    if(passv == pass2v){
      var usuarioNuevo = new User({ usuario:usuariov, email: emailv, pass: passv });
      console.log(usuarioNuevo.usuario);
    
      usuarioNuevo.save(function (err, anadirusuario, numberAffected) {
        if (err) {
          console.error(err);
          res.send('Error');
        } else {
          console.log('usuario creado:');
          console.log(anadirusuario);
          res.json(anadirusuario);}
          //mailgun
var api_key = 'key-895d8c83afc89fdfe4dbbc0f77914001';
var domain = 'sandbox8ce7f0bf5daa434f80e058f59c7e5798.mailgun.org';
var mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});
 
var data = {
  from: 'Sunit <SunBand@zubirimanteo.eus>',
  to: emailv,
  subject: 'Es hora de cuidar su piel',
  text: '(aqui tenemos que hacer lo de la activacion)'
};
 
mailgun.messages().send(data, function (error, body) {
  console.log(body);
});
          
      });
    }else{
      console.log("las contraseñas deben ser iguales");
      res.redirect('/index.html');
    }
  
});

var server = app.listen(process.env.PORT ||  process.env.OPENSHIFT_NODEJS_PORT || 3000, function(){
    console.log('Listening in port %d', server.address().port);
});




