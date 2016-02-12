var schema = require("../models/users.js");
var schema2 = require("../models/users.js");

//var user1 = mongoose.model('User1', schema.userModel);
var md5 = require('md5');


exports.verUsuarios = function(req, res) {

    //    var emailL = req.body.email;
    //    var passL = req.body.pass;
    ///    var passh2 = md5(passL);

    schema.findOne({
        //  'email': emailL,
        //  'pass': passh2,
        'usuario': req.session.a,
        'admin': "1"
    }, function(err, user) {
        if (user) {
            schema.find(function(error, usuarios) {
                var arrays = {
                    datos: usuarios
                };
                // var numeroDeUsuarios = usuarios.length;
                // console.log(numeroDeUsuarios)
                //  res.send(arrays);
                res.render('admin', arrays);
            });
        }
        else {
            res.redirect('/');
        }
    });

};
exports.usercompletos = function(req, res) {

    schema.find({}, {
        '_id': 0,
        'usuario': 1
    }, function(error, usuarios) {
        res.send(usuarios);

    });
};
/*
exports.usercompletos = function(req, res) {

    schema.find({}, {
        '_id': 0,
        'usuario': 1
    }, function(error, usuarios) {
        res.send(usuarios);

    });
};
*/

exports.prueba = function(req, res) {

    var user = req.params.usuario;


    schema.findOne({
        'usuario': new RegExp('^' + user + '$', "i")
    }, function(err, usuarioc) {
        console.log(usuarioc);
        res.send(usuarioc);
    });

};

exports.eliminar = function(req, res) {

    var user = req.body.usuario;
    console.log(user + "eliminar");
    schema.remove({
        usuario: user
    }, function(err) {
        console.log(user + " ha sido eliminado");
        res.redirect('/admin');
    });



};

exports.modificar = function(req, res) {

    var user = req.body.usuario;
    var email = req.body.email;
    var disp = req.body.dispositivo;
    var admin = req.body.admin;
    var confirm = req.body.confirm;
    console.log(user + email + disp + " aaaaaaaaaa");

    schema.update({
        'usuario': user
    }, {
        email: email,
        dispositivo: disp,
        admin: admin,
        confirmado: confirm
    }, function(user) {

        console.log("usuario actualizado");
        res.redirect('/admin');
    });

};
