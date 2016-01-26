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
    diaSemana: String
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
                         // res.json(anadirUv);
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
        
         var historialNuevo = new historial({dispositivo:disp_nombre, uv: uv, fecha: getFecha(), hora: getHora(), diaSemana: getDiaSemana()});
       
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
    //console.log("lol "+getFecha())
    radiacion.findOne({'dispositivo': req.session.dispositivo},function(err, Ruv) {
    if (err) {
        console.error(err);
        res.send('Error');
    } else {
        global.nivel;
        global.nivel = Ruv.uv;
     
        var nivelfinal = global.nivel;
        historial.find({'dispositivo' : req.session.dispositivo, "fecha" : {"$lte" : getFecha(),"$gte": (getFecha()-7)}},function(err, historia) {
console.log(historia)
            if (!historia) {
                console.error("no existe ese dispositivo :D");
            }
              
            else {
                var radiacion = [];
                 var fecha = [];
                
                for(var i= 0; i<historia.length; i++){
                
                    radiacion.push(historia[i].uv);
                     fecha.push(historia[i].fecha);
                    
                 
                } 
        
            }  
            res.render('login', {User: req.session.a,
                        Uv: nivelfinal,
                        max: global.max,
                        min: global.min,
                        meteo: global.datodia,
                        Esemana: radiacion,
                        Fototipo: global.fototipo
                        
                         });
        });
    
     //handlebars mostrar el usuario y el nivel de radiacion (ultimo añadido)
        
    }
 })//.sort({_id:-1}); 
};


function getFecha() {
    var fecha = new Date();
    var ano = fecha.getFullYear();
    var mes = fecha.getMonth() + 1;
    var dia = fecha.getUTCDate();
    
    var fechaCompleta = mes+"/"+dia+"/"+ano;
    
    var fechaFinal= new Date(fechaCompleta);
    return(fechaFinal);
}

function getDiaSemana() {
    var fecha = new Date();
    var diaSem = fecha.getDay();
    
    return(diaSem);
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