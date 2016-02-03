var TablaHistorial = require('../models/TablaHistorial.js');
var fecha = new Date();
var Hace7Dias = new Date();
Hace7Dias.setDate(fecha.getDate() -7);
//console.log(Hace7Dias);
/*
var express = require('express');
var app = express();
var session = require('express-session');
app.use(express.cookieParser());
app.use(session({ resave: true,
                  saveUninitialized: true,
                  secret: 'uwotm8'
                })
);*/
//app.use(express.static(__dirname +'/radiacion'));
exports.Semana = function  (res, req, dispositivo) {
   
 TablaHistorial.aggregate([{ $match : {fecha : {$lte : fecha, $gte : Hace7Dias}, dispositivo : dispositivo} },
                     { $group: { _id: {day: { $dayOfYear: "$fecha" }}, media: { $avg: "$uv" }} }] ,function(err, historia) {
console.log(historia)
            if (!historia) {
                console.error("no existe ese dispositivo :D");
            }
              
            else {
                var radiacion =[];
                 var fecha = [];
                
                for(var i= 0; i<historia.length; i++){
               
                    radiacion.push(historia[i].media);
                    fecha.push(historia[i]._id["day"]);
                    //seguir con estooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo
                    
                 
                } 
              // console.log("radiacionessss "+radiacion);
              console.log(radiacion+"+++++++++++++++"+fecha)
            global.radiacionF;
            global.radiacionF = radiacion;
             return radiacion;  
            }  
                   
        }); 
      
      
}
//module.exports = new datoSemana();