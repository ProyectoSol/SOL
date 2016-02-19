var schema3 = require("../models/TablaHistorial.js");

exports.api = function(req, res) {
    var dispositivo = req.params.dispositivo;
    schema3.find({
        'dispositivo': dispositivo
    },{
        '_id':0,
        'diaSemana':0,
        'hora':0
    }, function(err, datos) {
    if(err){
        console.log("error en la api");
    }else{
        if (!datos) {

            res.render('api', {
                error: "El dispositivo no existe"

            });
        }
        else {
            //console.log(datos)
            res.render('api', {
                json: datos

            });
        }
    }
    }).sort({fecha:-1});
};
