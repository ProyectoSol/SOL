var TablaHistorial = require('../models/TablaHistorial.js');

exports.Semana = function  (res, req, dispositivo, cb) {
   
var fecha = new Date();
var Hace7Dias = new Date();
Hace7Dias.setDate(fecha.getDate() -7);

TablaHistorial.aggregate([{ $match : {fecha : {$lte : fecha, $gte : Hace7Dias}, dispositivo : dispositivo} },
                     { $group: { _id: {day: { $dayOfMonth: "$fecha" }}, media: { $avg: "$uv" }} }] ,function(err, historia) {
                        
            if (!historia) {
                console.error("no existe ese dispositivo :D");
            }
              
            else {
                
                var radiacion =[];
                 var fecha = [];
               
           
   
                for(var i= 0; i<historia.length; i++){
               
                    radiacion.push(historia[i].media);
                    fecha.push(historia[i]._id["day"]);
                } 

        //    global.radiacionF = radiacion;
         //   global.fechaF = fecha;
            
             cb(radiacion,fecha);
            }  
                   
        }); 
   

};


//module.exports = new datoSemana();
