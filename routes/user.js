var express = require('express');
var app = express();
var mongoose = require('mongoose');
var session = require('express-session');
var randomstring = require('randomstring');
var md5 = require('md5');
var tiempo = require('./tiempo.js');

app.use(express.cookieParser());
app.use(session({ resave: true,
                  saveUninitialized: true,
                  secret: 'uwotm8'
                })
);

app.use(express.static(__dirname +'/radiacion'));


var usuarioEsquema = mongoose.Schema({
    usuario: String,
    email: String,
    pass: String,
    codigo: String,
    confirmado: String,
    //añadimos informacion adicional del usuario
    nombre: String,  
    apellido: String,
    fecha: String,
    sexo: String,
    //añadimos el fototipo
    ArrayFototipo:{
      pelo: String,
      ojos: String,
      piel: String,
      pecas: String,
      rojo: String,
      bronceado: String
    },
    fototipo: String,
    alertas: String,
    admin: String,
    dispositivo: String
},{ collection : 'usuario' });

var User = mongoose.model('User', usuarioEsquema);

var api_key = 'key-895d8c83afc89fdfe4dbbc0f77914001';
var domain = 'sandbox8ce7f0bf5daa434f80e058f59c7e5798.mailgun.org';
var mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});

exports.registro = function(req, res){
  //---------------------------------------- controlar usuarios
  var emailv = req.body.email;
  var usuariov = req.body.usuario;
  var passv = req.body.pass;
  var pass2v = req.body.pass2;
  User.findOne({'email': emailv},function(err, userc){
  
    if (!userc) {
       console.log('E-mail válido');
       
         User.findOne({'usuario': usuariov},function(error, userc2) {
  
          if (!userc2) {
            console.log('Usuario válido');
            
              var codigov = randomstring.generate(10);

                if(passv == pass2v){
                  
                  var passH =md5(passv);
                  var usuarioNuevo = new User({ usuario:usuariov, email: emailv, pass: passH, codigo: codigov, confirmado: 0 , dispositivo: ""});
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

exports.activacion = function(req, res){
  var codigo = req.params.codigo;
  User.update({codigo: codigo}, {confirmado:'1'}, function(user) {
   res.redirect('/');
   
   console.log("cuenta activada");
  });
};


exports.login = function(req, res){
  
 tiempo.recogertiempo(req, res);
 
 var emailL = req.body.email;
 var passL = req.body.pass;
 var passh2 = md5(passL);
  

  User.findOne({'email': emailL, 'pass':passh2},function(err, user) {

    if (!user) {
        console.error("email o contraseña incorrecta :D");
        res.render('index', {error4: "email o contraseña incorrecta :D"
                                
                                 });
        //req.flash('info', 'Flash Message Added');
       
    }
    else {
      
      if(user.confirmado == '1'){
       if(user.admin == "1"){
        console.log("admin entrando...");
        req.session.a = user.usuario;
         res.redirect('/admin');
       }
          else{
        
      req.session.a = user.usuario;
      global.fototipo = user.fototipo;
      console.log(global.fototipo);
      console.log(req.session.a);
        //dispositivo del usuario
       
         if(user.dispositivo == null || user.dispositivo == ""){
          req.session.dispositivo = "ML8511";
           console.log("dispositivo estandar "+req.session.dispositivo);
        }
        else{
          
           req.session.dispositivo = user.dispositivo;
          console.log("dispositivo personal "+req.session.dispositivo);
        } 
      res.redirect('/home');
          }
      }
      
      
      else{
        console.log('no confirmado');
        res.render('index', {error3: "confirma el emailaso"
                                
                                 });
      }
     
    } 
 });
 
};

exports.logout = function(req, res){
  req.session.destroy();
  console.log("Sesión destruida");
  res.redirect('/');
};

exports.fototipo = function(req, res){
     
     var peloF = req.body.cabello;
     var ojosF = req.body.ojos;
     var pielF = req.body.piel;
     var pecasF = req.body.pecas;
     var rojoF = req.body.eritema;
     var bronceadoF = req.body.bronceado;
 
 
  console.log(peloF + ojosF + pielF + pecasF + rojoF + bronceadoF);

  var ResultadoFototipo = (parseInt(peloF) + parseInt(ojosF) + parseInt(pielF) + parseInt(pecasF) + parseInt(rojoF) + parseInt(bronceadoF)) / 6;


  console.log("tu fototipo es "+ ResultadoFototipo);
 
  User.update({usuario: req.session.a}, {ArrayFototipo: {pelo: peloF,ojos: ojosF,piel: pielF,pecas: pecasF, rojo: rojoF,bronceado: bronceadoF},fototipo: ResultadoFototipo}, function(user) {
   res.redirect('/home');
   
   console.log("Usuario actualizado");
});

 
  
};

exports.info = function(req, res){
      var nombre = req.body.name;
     var apellido = req.body.apellidos;
     var fecha = req.body.fecha;
     var sexo  = req.body.sexo;
     
  console.log(nombre + apellido + fecha + sexo);
  
  User.update({usuario: req.session.a}, {nombre: nombre, apellido: apellido, fecha: fecha, sexo: sexo}, function(user) {
   res.redirect('/home');
   
   console.log("Usuario actualizado");
  });

};

exports.recuperacion = function(req, res){
  var email = req.body.email;
  console.log(email);
 
 User.findOne({'email': email},function(err, user) {

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

exports.cambiopass = function(req, res){
  
   var codigo = req.params.codigo;
  req.session.code = codigo;
  res.redirect('/recuperar.html');

};
exports.updatenueva =function(req, res, pass1){
  
     var pass1 = req.body.pass;
    var pass2 = req.body.pass2;
    
    if(pass1==pass2){
       // user.updatenueva(req, res, pass1);
       var passn = md5(pass1);
  
  User.update({codigo: req.session.code}, {pass: passn}, function(user) {
    req.session.destroy();
    res.redirect('/');
   
    console.log("Contraseña actualizada");
  });
    }else{
        console.log('Las contraseñas no coinciden');
    }
  
};

exports.alertas1 = function(){
  
  User.find({'alertas': '1'}, 'email',function(error, usera) {
    var emailAlertas = [];
    
    for(var i=0; i<usera.length;i++){
      emailAlertas[i] = usera[i].email;
    }
    ;
    var data = {
                      from: 'Sunit <SunBand@zubirimanteo.com>',
                      to: emailAlertas,
                      subject: 'Protege tu piel',
                      text: 'alerta de 10'
                    };
         
        mailgun.messages().send(data, function (error, body) {
          console.log(body);
        });
        console.log('emails '+emailAlertas);
  });
    
};

exports.alertas2 = function(){
  
  User.find({'alertas': '2'}, 'email',function(error, usera2) {
    var emailAlertas2 = [];
    
    for(var i=0; i<usera2.length;i++){
      emailAlertas2[i] = usera2[i].email;
    }
    ;
    var data = {
                      from: 'Sunit <SunBand@zubirimanteo.com>',
                      to: emailAlertas2,
                      subject: 'Protege tu piel',
                      text: 'alerta de 20'
                    };
         
         mailgun.messages().send(data, function (error, body) {
          console.log(body);
        });
        console.log('emails 2: '+emailAlertas2);
  });
    
};
exports.alertas3 = function(){
  
  User.find({'alertas': '3'}, 'email',function(error, usera3) {
    var emailAlertas3 = [];
    
    for(var i=0; i<usera3.length;i++){
      emailAlertas3[i] = usera3[i].email;
    }
    ;
    var data = {
                      from: 'Sunit <SunBand@zubirimanteo.com>',
                      to: emailAlertas3,
                      subject: 'Protege tu piel',
                      text: 'alerta de 30'
                    };
         
         mailgun.messages().send(data, function (error, body) {
          console.log(body);
        });
        console.log('emails 3: '+emailAlertas3);
  });
    
};

exports.configuracion = function (req, res) {
  
  
   var alertas = req.body.alertas;
     var tiempoAlertas = req.body.tiempoAlertas;
     var idDispositivo = req.body.idDispositivo;
     
User.update({usuario: req.session.a}, {alertas: alertas, tiempoDeAlertas: tiempoAlertas, dispositivo: idDispositivo}, function(user) {
  
   
   req.session.dispositivo = idDispositivo;
    res.redirect("/home");
   
   console.log("configuracion actualizado");
});
}


