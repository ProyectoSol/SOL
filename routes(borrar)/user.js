var express = require('express');
var app = express();
var mongoose = require('mongoose');
var session = require('express-session');
var registro = require('../controllers/registro.js');
var randomstring = require('randomstring');
var md5 = require('md5');
var tiempo = require('./tiempo.js');

app.use(express.cookieParser());
app.use(session({ resave: true,
                  saveUninitialized: true,
                  secret: 'uwotm8'
                })
);

app.use(express.static(__dirname +'/radiacion'));


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
      bronceado: String
    },
    fototipo: String,
    alertas: String,
    admin: String,
    dispositivo: String
},{ collection : 'usuario' });

var User = mongoose.model('User', usuarioEsquema);

var api_key = 'key-895d8c83afc89fdfe4dbbc0f77914001';
var domain = 'sandbox8ce7f0bf5daa434f80e058f59c7e5798.mailgun.org';
var mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});
















