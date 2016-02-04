var tiempo = require('../routes/tiempo.js');
var schema = require("../models/users.js");
var EstadisticaSemana = require('../routes/estadisticaSemana.js');
var EstadisticaHora = require('../routes/estadisticaHora.js');
var md5 = require('md5');

exports.login = function(req, res) {

 tiempo.recogertiempo(req, res);

 var emailL = req.body.email;
 var passL = req.body.pass;
 var passh2 = md5(passL);


 schema.findOne({
  'email': emailL,
  'pass': passh2
 }, function(err, user) {

  if (!user) {
   console.error("email o contraseña incorrecta :D");
   res.render('index', {
    error4: "email o contraseña incorrecta :D"

   });
   //req.flash('info', 'Flash Message Added');

  }
  else {

   if (user.confirmado == '1') {
    if (user.admin == "1") {
     console.log("admin entrando...");
     req.session.a = user.usuario;
     res.redirect('/admin');
    }
    else {

     req.session.a = user.usuario;
     global.fototipo = user.fototipo;
     console.log(global.fototipo);
     console.log(req.session.a);
     //dispositivo del usuario

     if (user.dispositivo == null || user.dispositivo == "") {
      req.session.dispositivo = "ML8511";
      console.log("dispositivo estandar " + req.session.dispositivo);
     }
     else {

      req.session.dispositivo = user.dispositivo;
      console.log("dispositivo personal " + req.session.dispositivo);
     }
     EstadisticaSemana.Semana(req,res,req.session.dispositivo);
     EstadisticaHora.Hora(req,res,req.session.dispositivo)
     res.redirect('/home');
    }
   }


   else {
    console.log('no confirmado');
    res.render('index', {
     error3: "confirma el emailaso"

    });
   }

  }
 });

};

exports.logout = function(req, res) {
 req.session.destroy();
 console.log("Sesión destruida");
 res.redirect('/');
};