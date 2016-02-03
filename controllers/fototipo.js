var schema =require("../models/users.js");

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
 
  schema.update({usuario: req.session.a}, {ArrayFototipo: {pelo: peloF,ojos: ojosF,piel: pielF,pecas: pecasF, rojo: rojoF,bronceado: bronceadoF},fototipo: ResultadoFototipo}, function(user) {
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
  
  schema.update({usuario: req.session.a}, {nombre: nombre, apellido: apellido, fecha: fecha, sexo: sexo}, function(user) {
   res.redirect('/home');
   
   console.log("Usuario actualizado");
  });

};