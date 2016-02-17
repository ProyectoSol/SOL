var schema =require("../models/users.js");
var login = require("./login.js")

exports.fototipo = function(req, res){
     
     var fototipoArray = req.params.fototipo;
     var arrayfototipoP = fototipoArray.split(',')
     console.log("fototipo nuevo "+ arrayfototipoP)
     
    /* var peloF = req.body.cabello;
     var ojosF = req.body.ojos;
     var pielF = req.body.piel;
     var pecasF = req.body.pecas;
     var rojoF = req.body.eritema;
     var bronceadoF = req.body.bronceado;
 */
 
 // console.log(peloF + ojosF + pielF + pecasF + rojoF + bronceadoF);

  //var ResultadoFototipo = (parseInt(arrayfototipoP[0]) + parseInt(arrayfototipoP[1]) + parseInt(arrayfototipoP[2]) + parseInt(arrayfototipoP[3]) + parseInt(arrayfototipoP[4]) + parseInt(arrayfototipoP[5]) ) / 6;
var ResultadoFototipo = (parseInt(arrayfototipoP[0]) + parseInt(arrayfototipoP[1]) +  parseInt(arrayfototipoP[2]) + parseInt(arrayfototipoP[3]) + parseInt(arrayfototipoP[4]) + parseInt(arrayfototipoP[5])) / 6;

  console.log("tu fototipo es "+ ResultadoFototipo);
 //schema.update({usuario: req.session.a}, {ArrayFototipo: {pelo: peloF,ojos: ojosF,piel: pielF,pecas: pecasF, rojo: rojoF,bronceado: bronceadoF},fototipo: ResultadoFototipo}, function(user) {
  
  schema.update({usuario: req.session.a}, {ArrayFototipo: {pelo: arrayfototipoP[0],
                                                           piel: arrayfototipoP[1],
                                                           ojos: arrayfototipoP[2],
                                                           pecas: arrayfototipoP[3], 
                                                           rojo: arrayfototipoP[4],
                                                           bronceado: arrayfototipoP[5]},
                                            fototipo: ResultadoFototipo}, function(user) {
  
  
   res.redirect("/home");
   
   console.log("Usuario actualizado");
});

 
  
};
exports.info = function(req, res){
      var nombre = req.body.name;
      var apellido = req.body.apellidos;
      var fecha = req.body.fecha;
      var sexo  = req.body.sexo;
     
  console.log(nombre + apellido + fecha + sexo);
  
  schema.update({usuario: req.session.a}, {nombre: nombre, apellido: apellido, fecha: fecha, sexo: sexo}, function(user) {
  
    res.redirect("/home");
   
   console.log("Usuario actualizado");
  });

};