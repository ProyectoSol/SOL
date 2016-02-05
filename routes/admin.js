var mongoose = require("mongoose");
var schema = require("../models/users.js");

var user1 = mongoose.model('User1', schema.userModel);


exports.verUsuarios = function(req, res) {

    user1.find(function(error, usuarios) {
        var arrays = {
            datos: usuarios
        };

        res.render('admin', arrays);
    });
};

exports.prueba = function(req, res) {

    var user = req.params.usuario;


    user1.findOne({
        'usuario': new RegExp('^' + user + '$', "i")
    }, function(err, usuarioc) {
        console.log(usuarioc);
        res.send(usuarioc);
    });

};

exports.modificar = function(req, res) {
    
    var user = req.params.usuario;
    var email = req.params.email;
    var disp = req.params.dispositivo;
    
    user1.update({'email': email}, {usuario: user, dispositivo:disp}, function(user) {
 
   console.log("usuario actualizado");
});
    
};
