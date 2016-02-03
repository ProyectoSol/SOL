var schema =require("../models/users.js");

var api_key = 'key-895d8c83afc89fdfe4dbbc0f77914001';
var domain = 'sandbox8ce7f0bf5daa434f80e058f59c7e5798.mailgun.org';
var mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});
exports.alertas1 = function(){
  
  schema.find({'alertas': '1'}, 'email',function(error, usera) {
    var emailAlertas = [];
    
    for(var i=0; i<usera.length;i++){
      emailAlertas[i] = usera[i].email;
    }
    ;
    var data = {
                      from: 'Sunit <SunBand@zubirimanteo.com>',
                      to: emailAlertas,
                      subject: 'Protege tu piel',
                      text: 'alerta de 10'
                    };
         
        mailgun.messages().send(data, function (error, body) {
          console.log(body);
        });
        console.log('emails '+emailAlertas);
  });
    
};

exports.alertas2 = function(){
  
  schema.find({'alertas': '2'}, 'email',function(error, usera2) {
    var emailAlertas2 = [];
    
    for(var i=0; i<usera2.length;i++){
      emailAlertas2[i] = usera2[i].email;
    }
    ;
    var data = {
                      from: 'Sunit <SunBand@zubirimanteo.com>',
                      to: emailAlertas2,
                      subject: 'Protege tu piel',
                      text: 'alerta de 20'
                    };
         
         mailgun.messages().send(data, function (error, body) {
          console.log(body);
        });
        console.log('emails 2: '+emailAlertas2);
  });
    
};
exports.alertas3 = function(){
  
  schema.find({'alertas': '3'}, 'email',function(error, usera3) {
    var emailAlertas3 = [];
    
    for(var i=0; i<usera3.length;i++){
      emailAlertas3[i] = usera3[i].email;
    }
    ;
    var data = {
                      from: 'Sunit <SunBand@zubirimanteo.com>',
                      to: emailAlertas3,
                      subject: 'Protege tu piel',
                      text: 'alerta de 30'
                    };
         
         mailgun.messages().send(data, function (error, body) {
          console.log(body);
        });
        console.log('emails 3: '+emailAlertas3);
  });
    
};