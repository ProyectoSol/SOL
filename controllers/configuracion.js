var schema =require("../models/users.js");
<<<<<<< HEAD
var EstadisticaSemana= require('../routes/estadisticaSemana.js');
=======

>>>>>>> 493ed6a55321ca7d8050603630dfc0c647ffd945
exports.configuracion = function (req, res) {
  
  
    var alertas = req.body.alertas;
    var tiempoAlertas = req.body.tiempoAlertas;
    var idDispositivo = req.body.idDispositivo;
     
schema.update({usuario: req.session.a}, {alertas: alertas, tiempoDeAlertas: tiempoAlertas, dispositivo: idDispositivo}, function(user) {
  
   
   req.session.dispositivo = idDispositivo;
<<<<<<< HEAD
    EstadisticaSemana.Semana(req,res, req.session.dispositivo);
=======
>>>>>>> 493ed6a55321ca7d8050603630dfc0c647ffd945
    res.redirect("/home");
   
   console.log("configuracion actualizado");
});
};
