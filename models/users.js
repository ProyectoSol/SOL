'use strict';

var mongoose = require('mongoose');

exports.userModel = function() {
    
    var usuarioEsquema = mongoose.Schema({
    usuario: String,
    email: String,
    pass: String,
    codigo: String,
    confirmado: String,
    //añadimos informacion adicional del usuario
    nombre: String,  
    apellido: String,
    fecha: String,
    sexo: String,
    //añadimos el fototipo
    ArrayFototipo:{
    pelo: String,
    ojos: String,
    piel: String,
    pecas: String,
    rojo: String,
    bronceado: String},
    fototipo: String,
    alertas: String,
    admin: String,
    dispositivo: String
},{ collection : 'usuario' });
    var userMo = mongoose.model('User1', usuarioEsquema)
    return (userMo);
};

//module.exports = new userModel();