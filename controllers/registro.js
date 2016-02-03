var mongoose = require('mongoose');
var session = require('express-session');
var randomstring = require('randomstring');
var md5 = require('md5');
var schema =require("../models/users.js");
//var User = mongoose.model('User', usuarioEsquema);



var api_key = 'key-895d8c83afc89fdfe4dbbc0f77914001';
var domain = 'sandbox8ce7f0bf5daa434f80e058f59c7e5798.mailgun.org';
var mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});

exports.registro = function(req, res){
  //---------------------------------------- controlar usuarios
  var emailv = req.body.email;
  var usuariov = req.body.usuario;
  var passv = req.body.pass;
  var pass2v = req.body.pass2;
  
  //registro.registro(req,res,emailv,usuariov,passv,pass2v);
 schema.findOne({'email': emailv},function(err, userc){
  
    if (!userc) {
       console.log('E-mail válido');
       
         schema.findOne({'usuario': usuariov},function(error, userc2) {
  
          if (!userc2) {
            console.log('Usuario válido');
            
              var codigov = randomstring.generate(10);

                if(passv == pass2v){
                  
                  var passH =md5(passv);
                  var usuarioNuevo = new schema({ usuario:usuariov, email: emailv, pass: passH, codigo: codigov, confirmado: 0 , dispositivo: ""});
                  console.log(usuarioNuevo.usuario);
                
                  usuarioNuevo.save(function (err, anadirusuario, numberAffected) {
                  if (err) {
                    console.error(err);
                    res.send('Error');
                  } else {
                    console.log('usuario creado:');
                    console.log(anadirusuario);
                  }
                  
                  var data = {
                    from: 'Sunit <SunBand@zubirimanteo.com>',
                    to: emailv,
                    subject: 'Es hora de cuidar su piel',
                    text: 'Activación de la cuenta: http://sunit.zubirimanteoweb.com/activacion/'+codigov
                  };
                   
                  mailgun.messages().send(data, function (error, body) {
                    console.log(body);
                  });
                });
            
                }else{
                  console.log("las contraseñas deben ser iguales");
                  
                }  res.redirect('/');
          
          }
          else {
              
            console.log(" El usuario ya existe "+err);
           res.render('index', {error1: "El usuario ya existe"
                        
                     });
         
          } 
        });
      }
      else {
              console.log(" El email ya existe "+err);
               res.render('index', {error2: "El email ya existe"
                                
                                 });
                 
              
            } 
  });
 
};
exports.recuperacion = function(req, res){
  var email = req.body.email;
  console.log(email);
 
 schema.findOne({'email': email},function(err, user) {

   if (!user) {
        console.error("email no existe :D");
        
      }
      
      else {
        
        var data = {
                      from: 'Sunit <SunBand@zubirimanteo.com>',
                      to: email,
                      subject: 'Cambio de contraseña',
                      text: 'Cambio de contraseña de sunit: http://sunit.zubirimanteoweb.com/cambiopass/'+user.codigo
                    };
         
        mailgun.messages().send(data, function (error, body) {
          console.log(body);
        });
        res.redirect('/');
       
      }
 });
};