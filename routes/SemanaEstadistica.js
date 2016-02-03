var TablaHistorial = require('../models/TablaHistorial.js');
 var fecha = new Date();
 var Hace7Dias = new Date();
 Hace7Dias.setDate(fecha.getDate() -7);
 //console.log(Hace7Dias)
var Semana = function (res,req) {
     TablaHistorial.aggregate([{ $match : {fecha : {$lte : fecha, $gte : Hace7Dias}, dispositivo : req.session.dispositivo} },
                     { $group: { _id: {day: { $dayOfYear: "$fecha" }}, media: { $avg: "$uv" } } }] ,function(err, historia) {

            if (!historia) {
                console.error("no existe ese dispositivo :D");
            }
              
            else {
                var radiacion =[];
              //   var fecha = [];
                
                for(var i= 0; i<historia.length; i++){
               
                    radiacion.push(historia[i].media);
                    //fecha.push(historia[i]._id);
                    
                 
                } 
               console.log("radiaciones "+radiacion)
        
            } 
             return (radiacion)
        });
       
       
}
module.exports = new Semana();