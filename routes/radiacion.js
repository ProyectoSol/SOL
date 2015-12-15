var express = require('express');
var app = express();
var conexionBD = require('./conexion.js');
conexionBD.conexion();
var mongoose = require('mongoose');

var radiacionEsquema = mongoose.Schema({
    dispositivo: String,
    uv: String
},{ collection : 'dispositivo' });

var radiacion = mongoose.model('uv', radiacionEsquema);

app.post('/radiacion', function(req, res){

 

});

exports.insert = function(req, res, disp_nombre, uv){
     
      var uvNuevo = new radiacion({dispositivo: disp_nombre, uv: uv });
      console.log(uvNuevo.uv);
    
      uvNuevo.save(function (err, anadirUv, numberAffected) {
        if (err) {
          console.error(err);
          res.send('Error');
        } else {
          console.log('Radiacion subida');
          console.log(anadirUv);
          res.json(anadirUv);
        }
    });
}
/*
function mostrar() {
 radiacion.findOne({'_id': '566eb24df1cdc3092d4dbb68'},'uv',function(req, uv, err) {
   console.log(uv);
 });
}
*/