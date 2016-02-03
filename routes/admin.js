var mongoose = require("mongoose");
var schema =require("../models/users.js");

var user1 = mongoose.model('User1', schema.userModel);


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
    
    res.send(datosUsuario);
  });

};