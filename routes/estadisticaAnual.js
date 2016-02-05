var TablaHistorial = require('../models/TablaHistorial.js');


exports.anual = function(res, req, dispositivo,cb) {
    var fecha = new Date();
    var Hace7anos = new Date();
    Hace7anos.setFullYear(fecha.getFullYear()-7);
    

    TablaHistorial.aggregate([{ $match : {fecha : {$lte : fecha, $gte : Hace7anos}, dispositivo : dispositivo} },
                     { $group: { _id: { year: { $year: "$fecha" }}, media: { $avg: "$uv" }} }] ,function(err, historia) {
                         
//console.log( historia)
            if (!historia) {
                console.error("no existe ese dispositivo :D");
            }
              
            else {
                var radiacionAnual =[];
                 var ano = [];
                
                for(var i= 0; i<historia.length; i++){
               
                    radiacionAnual.push(historia[i].media);
                    ano.push(historia[i]._id["year"]);
                    
                 
                } 
              // console.log("radiacionessss "+radiacion);
           //   console.log(radiacion+"+++++++++++++++"+fecha)
            //global.radiacionF;
            global.radiacionA = radiacionAnual;
            global.fechaAnual = ano;
            cb(radiacionAnual,ano)
            //console.log(global.fechaAnual)
             //return radiacion;  
            }  
                   
        }); 
      
    
   
}


