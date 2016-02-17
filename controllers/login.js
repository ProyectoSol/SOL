var tiempo = require('./tiempo.js');
var schema = require("../models/users.js");
var EstadisticaSemana = require('./estadisticaSemana.js');
var EstadisticaHora = require('./estadisticaHora.js');
var EstadisticaAnual = require('./estadisticaAnual.js');
var md5 = require('md5');
var Ficheroradiacion = require("./radiacion.js");


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
  console.error("problemas al iniciar session");
//   res.render('index', {
//    error4: "email o contraseña incorrecta :D"

 //  });
  }
  else {
   req.session.a = user.usuario;
    res.redirect("/home");
/*
   if (user.confirmado == '1') {
    req.session.a = user.usuario;

    if (user.admin == "1") {
     console.log("admin entrando...");

     res.redirect('/admin');
    }
    else {

     var fototipo = user.fototipo;

     if (user.dispositivo == null || user.dispositivo == "") {
      req.session.dispositivo = "ML8511";
      //     console.log("dispositivo estandar " + req.session.dispositivo);
      //  Ficheroradiacion.mostrar(req, res, fototipo);
      res.redirect("/home");
     }
     else {

      req.session.dispositivo = user.dispositivo;
      //   console.log("dispositivo personal " + req.session.dispositivo);
      // Ficheroradiacion.mostrar(req, res, fototipo);
      res.redirect("/home");
     }
    }
   }


   else {
    console.log('no confirmado');
    res.render('index', {
     error3: "confirma el email"

    });
   }
*/
  }

 });

};

exports.logout = function(req, res) {
 req.session.destroy();
 console.log("Sesión destruida");
 res.redirect('/');
};


exports.mantenerlogin = function(req, res) {
 if (req.session.a) {
  schema.findOne({
   'usuario': req.session.a
  }, function(err, user) {

   if (user.confirmado == '1') {
    // req.session.a = user.usuario;

    if (user.admin == "1") {
     console.log("admin entrando...");

     res.redirect('/admin');
    }
    else {
     var fototipo = user.fototipo;

     if (user.dispositivo == null || user.dispositivo == "") {
      req.session.dispositivo = "ML8511";
      console.log("dispositivo estandar " + req.session.dispositivo);
      Ficheroradiacion.mostrar(req, res, fototipo);
     }
     else {

      req.session.dispositivo = user.dispositivo;
      console.log("dispositivo personal " + req.session.dispositivo);
      Ficheroradiacion.mostrar(req, res, fototipo);
     }
    }
   }


   else {
    console.log('no confirmado');
    res.render('index', {
     error3: "confirma el email"

    });
   }



  });
 }
}