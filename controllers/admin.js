var schema = require("../models/users.js");
var schema2 = require("../models/dispositivos.js");

exports.verUsuarios = function(req, res) {
    schema.findOne({
        'usuario': req.session.a,
        'admin': "1"
    }, function(err, user) {
        if (user) {
            res.render('admin');
        }
        else {
            res.redirect('/');
        }
    });

};

exports.usercompletos = function(req, res) {
    console.log('SESION DE ADMIN: ' + req.session.a);
    if (req.session.a == undefined || req.session.a == null) {
        console.log('no hay sesion');
        res.redirect('/');
    }
    else {

        console.log('sesion: ' + req.session.a);
        schema.find({
            'usuario': req.session.a,
            'admin': "1"
        }, function(err, user) {
            console.log('USUARIO:' + user);
            if (user) {
                console.log('entro a user');
                schema.find({}, {
                    '_id': 0,
                    'usuario': 1
                }, function(error, usuarios) {
                    console.log('find de usuarios');
                    res.send(usuarios);

                });
            }
            else {
                console.log('else');
                res.redirect('/');
            }
        });
    }
};

exports.dispcompletos = function(req, res) {
    schema.find({
        'usuario': req.session.a,
        'admin': "1"
    }, function(err, user) {
        if (user) {
            schema2.find({}, {
                '_id': 0,
                'dispositivo': 1
            }, function(error, dispositivos) {
                res.send(dispositivos);

            });
        }
        else {
            res.redirect('/');
        }
    });


};

exports.buscarusu = function(req, res) {

    var user = req.params.usuario;


    schema.findOne({
        'usuario': new RegExp('^' + user + '$', "i")
    }, function(err, usuarioc) {
        console.log(usuarioc);
        res.send(usuarioc);
    });

};

exports.buscardisp = function(req, res) {

    var dispositivo = req.params.dispositivo;


    schema2.findOne({
        'dispositivo': new RegExp('^' + dispositivo + '$', "i")
    }, function(err, dispositivoC) {
        console.log(dispositivoC);
        res.send(dispositivoC);
    });

};

exports.eliminarusu = function(req, res) {

    var user = req.body.usuario;
    console.log(user + "eliminar");
    schema.remove({
        usuario: user
    }, function(err) {
        console.log(user + " ha sido eliminado");
        res.redirect('/admin');
    });



};

exports.modificarusu = function(req, res) {

    var user = req.body.usuario;
    var email = req.body.email;
    var disp = req.body.dispositivo;
    var admin = req.body.admin;
    var confirmado = req.body.confirmado;
    console.log(user + email + disp + " aaaaaaaaaa");
    
    schema.findOne({
        'email': email    
    },function(usu){
       console.log('daatoos::' +usu);
       // console.log('usuario:: ' + usu.usuario + ' --  email:: ' + usu.email);
        
    });
    schema.update({
        'usuario': user
    }, {
        email: email,
        dispositivo: disp,
        admin: admin,
        confirmado: confirmado
    }, function(user) {

        console.log("usuario actualizado");
        res.redirect('/admin');
    });

};

exports.eliminardisp = function(req, res) {

    var disp = req.body.ddispositivo;
    console.log(disp + " eliminar");
    schema2.remove({
        dispositivo: disp
    }, function(err) {
        console.log(disp + " ha sido eliminado");
        res.redirect('/admin');
    });
};

exports.modificardisp = function(req, res) {

    var disp = req.body.ddispositivo;
    var ciudad = req.body.ciudad;

    console.log(disp + ciudad + " aaaaaaaaaa");

    schema2.update({
        'dispositivo': disp
    }, {
        ciudad: ciudad

    }, function(user) {

        console.log("usuario actualizado");
        res.redirect('/admin');
    });

};
