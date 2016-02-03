var TablaHistorial = require('../models/TablaHistorial.js');
var fecha = new Date();
var Hace7Dias = new Date();
Hace7Dias.setDate(fecha.getDate() -7);
console.log(Hace7Dias);