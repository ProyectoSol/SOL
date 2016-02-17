//http://www.redotheweb.com/2012/10/12/mongodb-new-aggregation-framework-and-sql-side-by-side.html
var express = require('express');
var app = express();
var mongoose = require('mongoose');
var historialEsquema = mongoose.Schema({
    dispositivo: String,
    uv: Number,
    fecha: String,
    hora: String,
    diaSemana: String
},{ collection : 'historial' });
var historial = mongoose.model('historial2', historialEsquema);


exports.mostrar = function(req, res){
     var fecha = new Date();
     var Hace7Dias = new Date();
  
    Hace7Dias.setDate(fecha.getDate() -7)
    console.log(Hace7Dias)
    
 historial.aggregate([
  { $match : {
   fecha : { $gte : Hace7Dias, $lte : fecha},
   dispositivo : req.session.dispositivo
  } },
  { $group: {
    _id: {day: { $dayOfYear: "$fecha" }},
    media: { $avg: "$uv" }
  } }
],function(err, medias){
    
    console.log(medias);
});



};


function getFecha() {
    var fecha = new Date();
    var ano = fecha.getFullYear();
    var mes = fecha.getMonth() + 1;
    var dia = fecha.getUTCDate();
    
    var fechaCompleta = mes+dia+ano;
    

    return(fechaCompleta);
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