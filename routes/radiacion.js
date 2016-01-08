var express = require('express');
var app = express();
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
};

//---------------coger ultimo indice de radiacion--------
exports.mostrar = function(req, res){
    
    radiacion.findOne({},function(err, Ruv) {
    
    if (err) {
        console.error(err);
        res.send('Error');
    } else {
        global.nivel;
        global.nivel = Ruv.uv;
     
        var nivelfinal = global.nivel;
     
     //handlebars mostrar el usuario y el nivel de radiacion (ultimo añadido)
        res.render('login', {User: req.session.a,
                            Uv: nivelfinal
                            });
    }
 }).sort({_id:-1}); 
};