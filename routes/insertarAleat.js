var TablaHistorial = require('../models/TablaHistorial.js');
var fecha = new Date();

function random() {
    var x = Math.floor((Math.random() * 12) + 1);
   //* document.getElementById("demo").innerHTML = x;
   return(x)
}

var count = 8;

exports.anadirHistorial=function (req,res) {
    var start = new Date();
    start.setHours(count);
    var hora = start.getHours();
    
    console.log(hora)
    
    if(count > 18){
        count = 8
        start.setHours(count);
    }
    else{
        start.setHours(count);
   var historial = new TablaHistorial({dispositivo : "lol", fecha: fecha, uv: random(), hora: hora});
     // console.log(fecha+" "+random()+" "+start)
      historial.save(function (err, historiaNueva, numberAffected) {
                  if (err) {
                    console.error(err);
                    res.send('Error');
                  } else {
                    console.log('historial creado:');
                    console.log(historiaNueva);
                  }
                  

                });
        count++;
    }
}


            