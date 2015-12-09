var bodyParser = require('body-parser');
var express = require('express');
var app = express();
var mongoose = require('mongoose');
var conexionBD = require('./routes/conexion.js');

conexionBD.conexion();

var usuarioEsquema = mongoose.Schema({
    usuario: String,
    email: String,
    pass: String
},{ collection : 'usuario' });

var User = mongoose.model('User', usuarioEsquema);

exports.registro = function(req, res, usuariov,emailv,passv,pass2v){

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
          res.json(anadirusuario);
        }
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
}
exports.login = function(req, res, emailL, passL){
  User.findOne({'email': emailL}, 'usuario', function(err, document) {
    
});
}