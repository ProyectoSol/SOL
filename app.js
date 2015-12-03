var express = require('express');
var conexionBD = require('./routes/conexion.js');
var mongoose = require('mongoose');
var app = express();
var bodyParser = require('body-parser');



var usuarioEsquema = mongoose.Schema({
    usuario: String,
    email: String,
    pass: String
},{ collection : 'usuario' });

var User = mongoose.model('User', usuarioEsquema);

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



// model
conexionBD.conexion();

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
  text: ' (aqui tenemos que hacer lo de la activacion)'
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

var port = process.env.OPENSHIFT_NODEJS_PORT || process.env.PORT || 3000;
var ip = process.env.OPENSHIFT_NODEJS_IP || process.env.IP || "127.0.0.1";

var server = app.listen(port, ip, function(){
    console.log('Listening in port %d', server.address().port);
});



