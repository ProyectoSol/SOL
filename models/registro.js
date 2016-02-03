 
 exports.userModel = function() {
 User.findOne({'email': emailv},function(err, userc){
  
    if (!userc) {
       console.log('E-mail válido');
       
         User.findOne({'usuario': usuariov},function(error, userc2) {
  
          if (!userc2) {
            console.log('Usuario válido');
            
              var codigov = randomstring.generate(10);

                if(passv == pass2v){
                  
                  var passH =md5(passv);
                  var usuarioNuevo = new User({ usuario:usuariov, email: emailv, pass: passH, codigo: codigov, confirmado: 0 , dispositivo: ""});
                  console.log(usuarioNuevo.usuario);
                
                  usuarioNuevo.save(function (err, anadirusuario, numberAffected) {
                  if (err) {
                    console.error(err);
                    res.send('Error');
                  } else {
                    console.log('usuario creado:');
                    console.log(anadirusuario);
                  }
                  
                  var data = {
                    from: 'Sunit <SunBand@zubirimanteo.com>',
                    to: emailv,
                    subject: 'Es hora de cuidar su piel',
                    text: 'Activación de la cuenta: http://sunit.zubirimanteoweb.com/activacion/'+codigov
                  };
                   
                  mailgun.messages().send(data, function (error, body) {
                    console.log(body);
                  });
                });
            
                }else{
                  console.log("las contraseñas deben ser iguales");
                  
                }  res.redirect('/');
          
          }
          else {
              
            console.log(" El usuario ya existe "+err);
           res.render('index', {error1: "El usuario ya existe"
                        
                     });
         
          } 
        });
      }
      else {
              console.log(" El email ya existe "+err);
               res.render('index', {error2: "El email ya existe"
                                
                                 });
                 
              
            } 
  });
 };