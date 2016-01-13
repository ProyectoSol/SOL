var express = require('express');
var app = express();

exports.consulta =  function(req, res, email, asunto, mensaje){

    var api_key = 'key-895d8c83afc89fdfe4dbbc0f77914001';
    var domain = 'sandbox8ce7f0bf5daa434f80e058f59c7e5798.mailgun.org';
    var mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});
     console.log("mensaje enviado de "+ email);
    var data = {
      from: email,
      to: 'sunitzubiriweb@gmail.com',
      subject: asunto,
      text: mensaje
    };
     
    mailgun.messages().send(data, function (error, body) {
      console.log(body);
    
    });
    res.redirect('/');
};