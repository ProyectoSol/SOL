var TablaHistorial = require('../models/TablaHistorial.js');


var start = new Date();
start.setHours(8);

var end = new Date();
end.setHours(18);

exports.Hora = function(res, req, dispositivo) {
    TablaHistorial.find({
        fecha: {
            $gte: start,
            $lt: end
        },
        dispositivo: dispositivo
    }, function(err, historia) {
        // console.log(historia)
        if (!historia) {
            console.error("no existe ese dispositivo :D");
        }
        else {
            var radiacionH = [];
            var hora = [];

            for (var i = 0; i < historia.length; i++) {

                radiacionH.push(historia[i].uv);
             
              // hora.push(historia[i].hora);
            var horas = historia[i].hora.split(':');
            var  hour = parseInt(horas[0]);
             hora.push(hour);
            }
             console.log(radiacionH +"---"+ hora)
            global.radiacionH;
           
           
           
            global.horaR;

            global.radiacionH = radiacionH;
            global.horaR = hora;


        }

    });


}