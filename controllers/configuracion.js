var schema =require("../models/users.js");

var EstadisticaSemana = require('../routes/estadisticaSemana.js');
var EstadisticaHora = require('../routes/estadisticaHora.js');
var EstadisticaAnual = require('../routes/estadisticaAnual.js');

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

    EstadisticaSemana.Semana(req,res, req.session.dispositivo);
    EstadisticaHora.Hora(req,res,req.session.dispositivo)
    EstadisticaAnual.anual(req,res,req.session.dispositivo)
    res.redirect("/home");
   
   console.log("configuracion actualizado");
});
};
