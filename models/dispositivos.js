'use strict';

var mongoose = require('mongoose');

var userModel = function() {
    
    var usuarioEsquema = mongoose.Schema({
    dispositivo: String,
    ciudad: String
},{ collection : 'dispositivo' });
   return mongoose.model('dispositivo1', usuarioEsquema)
   
};

module.exports = new userModel();