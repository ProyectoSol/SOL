var md5 = require('md5');
var schema = require("../models/users.js");

exports.cambiopass = function(req, res) {

    var codigo = req.params.codigo;
    req.session.code = codigo;
    res.redirect('/recuperar');

};

exports.redirigir = function(req,res){
    res.render('recuperar');
};
exports.updatenueva = function(req, res) {

    var pass1 = req.body.pass1;
    var pass2 = req.body.pass2;

    if (pass1 == pass2) {
        var passn = md5(pass1);

        schema.update({
            codigo: req.session.code
        }, {
            pass: passn
        }, function(user) {
            req.session.destroy();
            res.redirect('/');

            console.log("Contraseña actualizada");
        });
    }
    else {
        console.log('Las contraseñas no coinciden');
        res.redirect('/recuperar');
    }

};