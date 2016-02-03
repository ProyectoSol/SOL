var user = require('../models/users.js');
var mongoose = require("mongoose");
var schema =require("../models/users.js");




<<<<<<< HEAD
var user1 = mongoose.model('User1', user.userModel);

=======
>>>>>>> 493ed6a55321ca7d8050603630dfc0c647ffd945
exports.verUsuarios = function(req, res){
        
    user1.find(function(error, usuarios){
        var arrays = {datos:usuarios};
        
        res.render('admin', arrays);
    });
};

exports.prueba = function (req, res){
  
  var user = req.params.usuario;
    
  user1.findOne({'usuario': user}, function(error, usuarioc) {
    
    var datosUsuario = {datosUser:usuarioc};
    
<<<<<<< HEAD
    res.send(datosUsuario);
  });
=======
 /*   user1.find(function(error, listaUsuarios) {
        var arrayUsu = [];   
        for(var i=0;i<listaUsuarios.length;i++){
            arrayUsu.push(listaUsuarios[i].email);
            console.log(listaUsuarios[i].email);
        };
        
            res.render('admin', {usuarios: arrayUsu});
                 
              
        });  */
        
        schema.find(function(error, usuarios){
            var arrays = {datos:usuarios};
            
            res.render('admin', arrays);
        });
>>>>>>> 493ed6a55321ca7d8050603630dfc0c647ffd945
};