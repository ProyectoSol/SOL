'use strict';
var mongoose = require('mongoose');

var datoRadiacion = function() {

    var radiacionEsquema = mongoose.Schema({
        dispositivo: String,
        uv: String
    }, {
        collection: 'dispositivo'
    });

    return mongoose.model('uv', radiacionEsquema);
};


module.exports = new datoRadiacion();

/*
var radiacion = mongoose.model('uv', radiacionEsquema);
var historial = mongoose.model('historial', historialEsquema);
*/