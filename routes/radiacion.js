var express = require('express');
var app = express();
var mongoose = require('mongoose');

var radiacionEsquema = mongoose.Schema({
    dispositivo: String,
    uv: String
},{ collection : 'dispositivo' });

var historialEsquema = mongoose.Schema({
    dispositivo: String,
    uv: String,
    fecha: String,
    hora: String,
},{ collection : 'historial' });

var radiacion = mongoose.model('uv', radiacionEsquema);
var historial = mongoose.model('historial', historialEsquema);


exports.insert = function(req, res, disp_nombre, uv){
   //------------------------------------------comprobar existencia del dispositivo y update
    

    
    radiacion.findOne({'dispositivo': disp_nombre},function(err, disp){
        if(!disp){
            //insertar dispositivo nuevo y radiacion
            var uvNuevo = new radiacion({dispositivo: disp_nombre, uv: uv });
            console.log(uvNuevo.uv);
    
             uvNuevo.save(function (err, anadirUv, numberAffected) {
                  if (err) {
                             console.error(err);
                             res.send('Error');
                  } 
                  else {
                          console.log('Radiación registrada');
                          console.log(anadirUv);
                          res.json(anadirUv);
                }
            });
            
        }
        else{
            //actualizar datos de un dispositivo
            radiacion.update({dispositivo: disp.dispositivo}, {uv: uv}, function(radiacion) {
                console.log("El dispositivo se ha actualizado");
            });
        };
        //-------------------------insertar en el historial
        
         var historialNuevo = new historial({dispositivo:disp_nombre, uv: uv, fecha: getFecha(), hora: getHora() });
       
        historialNuevo.save(function (err, anadirHistorial, numberAffected) {
                  if (err) {
                             console.error(err);
                             res.send('Error');
                  } 
                  else {
                          console.log('historial registrada');
                          console.log(anadirHistorial);
                          res.json(anadirHistorial);
                }
            });
            
        
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


function getFecha() {
    var fecha = new Date();
    var ano = fecha.getFullYear();
    var mes = fecha.getMonth() + 1;
    var dia = fecha.getUTCDate();
    
    var fechaCompleta = dia+"/"+mes+"/"+ano;

    return(fechaCompleta);
}

function getHora() {
    var fecha = new Date();
    var hora = fecha.getHours();
    var min = fecha.getMinutes();
    
    if (min < 10) {
        min = "0" + min;
    }
    
    var horaCompleta = hora+":"+min;
    
    return(horaCompleta);
}