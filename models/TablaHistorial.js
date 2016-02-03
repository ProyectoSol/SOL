'use strict';
var mongoose = require('mongoose');

var datoHistorial = function () {
var historialEsquema = mongoose.Schema({
    dispositivo: String,
    uv: Number,
    fecha: Date,
    hora: String,
    diaSemana: String
},{ collection : 'historial' });
 return mongoose.model('historial', historialEsquema);
}
module.exports = new datoHistorial();