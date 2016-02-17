var schema =require("../models/users.js");
var login = require("./login.js")

var EstadisticaSemana = require('./estadisticaSemana.js');
var EstadisticaHora = require('./estadisticaHora.js');
var EstadisticaAnual = require('./estadisticaAnual.js');

exports.panel = function (req, res) {
  schema.findOne({'usuario': req.session.a},function(error, userc2) {
    if(error){
        console.log("error en find en configuration.js linea 8");
         res.redirect("/home");
    }
    else{
       res.render('panel', {
                    nombre: userc2.nombre,
                    apellido: userc2.apellido,
                    Fecha: userc2.fecha
                });
    }
         
        });
  

};

exports.configuracion = function (req, res) {
  
  
    var alertas = req.body.alertas;
    var tiempoAlertas = req.body.tiempoAlertas;
    var idDispositivo = req.body.idDispositivo;
     
schema.update({usuario: req.session.a}, {alertas: alertas, tiempoDeAlertas: tiempoAlertas, dispositivo: idDispositivo}, function(user) {
     req.session.dispositivo = idDispositivo;

//login.login(req,res);
    res.redirect("/home");
    
   
   console.log("configuracion actualizado");
});
};
