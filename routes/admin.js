var mongoose = require("mongoose");
var schema = require("../models/users.js");

var user1 = mongoose.model('User1', schema.userModel);


exports.verUsuarios = function(req, res) {

    user1.find(function(error, usuarios) {
        var arrays = {
            datos: usuarios
        };
      //  res.send(arrays);
        res.render('admin', arrays);
    });
};

exports.usercompletos = function(req, res) {

    user1.find({},{'_id':0 , 'usuario':1}, function(error, usuarios) {
       res.send(usuarios);

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

exports.eliminar = function(req, res) {

    var user = req.params.usuario;
    user1.remove({
        usuario: user
    }, function(err) {
        console.log(user + " ha sido eliminado");
    });

    

};

exports.modificar = function(req, res) {

    var user = req.params.usuario;
    var email = req.params.email;
    var disp = req.params.dispositivo;

    user1.update({
        'email': email
    }, {
        usuario: user,
        dispositivo: disp
    }, function(user) {


        console.log("usuario actualizado");
    });

};
