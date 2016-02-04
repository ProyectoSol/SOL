var TablaHistorial = require('../models/TablaHistorial.js');


exports.Semana = function  (res, req, dispositivo) {
   var fecha = new Date();
var Hace7Dias = new Date();
Hace7Dias.setDate(fecha.getDate() -7);
  //  console.log("dddd"+fecha)
   
 TablaHistorial.aggregate([{ $match : {fecha : {$lte : fecha, $gte : Hace7Dias}, dispositivo : dispositivo} },
                     { $group: { _id: {day: { $dayOfMonth: "$fecha" }}, media: { $avg: "$uv" }} }] ,function(err, historia) {
//console.log(historia)
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
              // console.log("radiacionessss "+radiacion);
           //   console.log(radiacion+"+++++++++++++++"+fecha)
            //global.radiacionF;
            global.radiacionF = radiacion;
            global.fechaF = fecha;
             return radiacion;  
            }  
                   
        }); 
      
      
}
//module.exports = new datoSemana();