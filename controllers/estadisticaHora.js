var TablaHistorial = require('../models/TablaHistorial.js');

exports.Hora = function(res, req, dispositivo, cb) {
    var inicio = new Date();
    var fin = new Date();
    inicio.setUTCHours(8);
    fin.setUTCHours(20);
   //console.log(inicio+" inicio");
    //console.log(fin+" fin");
    
    TablaHistorial.find({
        fecha: {
            $gte: inicio,
            $lt: fin
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
            // console.log(radiacionH +"---"+ hora)
            global.radiacionH;
            global.horaR;

            global.radiacionH = radiacionH;
            global.horaR = hora;
            
            cb(radiacionH,hora);
          

        }
         

    }).sort( { hora: -1 } )


}