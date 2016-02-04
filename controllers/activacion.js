var schema = require("../models/users.js");


exports.activacion = function(req, res) {
    var codigo = req.params.codigo;
    schema.update({
        codigo: codigo
    }, {
        confirmado: '1'
    }, function(user) {
        res.redirect('/');

        console.log("cuenta activada");
    });
};
