var TablaHistorial = require('../models/TablaHistorial.js');

exports.anual = function(res, req, dispositivo,cb) {
    var fecha = new Date();
    var Hace7meses = new Date();
    //Hace7meses.setMonth(fecha.setMonth(-7));
    Hace7meses.setMonth(-7);
    
   // console.log(Hace7meses)
    

    TablaHistorial.aggregate([{ $match : {fecha : {$lte : fecha, $gte : Hace7meses}, dispositivo : dispositivo} },
                    { $sort: { fecha: -1 } },
                     { $group: { _id: { month: { $month: "$fecha" }}, media: { $avg: "$uv" }} }] ,function(err, historia) {
                         
//console.log( historia)
            if (!historia) {
                console.error("no existe ese dispositivo :D");
            }
              
            else {
                var radiacionAnual =[];
                 var mes = [];
                
                for(var i= 0; i<historia.length; i++){
               
                    radiacionAnual.push(historia[i].media);
                    mes.push(historia[i]._id["month"]);
                    
                 
                } 
           
            cb(radiacionAnual,mes)
           
            }  
                   
        }) 
      
    
   
}


