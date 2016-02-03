var schema =require("../models/users.js");

exports.configuracion = function (req, res) {
  
  
    var alertas = req.body.alertas;
    var tiempoAlertas = req.body.tiempoAlertas;
    var idDispositivo = req.body.idDispositivo;
     
schema.update({usuario: req.session.a}, {alertas: alertas, tiempoDeAlertas: tiempoAlertas, dispositivo: idDispositivo}, function(user) {
  
   
   req.session.dispositivo = idDispositivo;
    res.redirect("/home");
   
   console.log("configuracion actualizado");
});
};
