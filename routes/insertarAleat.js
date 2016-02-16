var TablaHistorial = require('../models/TablaHistorial.js');
var TablaRadiacion = require('../models/TablaRadiacion.js');
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
    
   
    
    if(count > 18){
        count = 8;
        start.setHours(count);
        fecha.setHours(count)
    }
    else{
        start.setHours(count);
        fecha.setHours(count)
        
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



exports.anadirRadiacion=function (req,res) {
    var start = new Date();
    start.setHours(new Date());
    var hora = start.getHours();
    
   /* if(count > 18){
        count = 8;
        start.setHours(count);
        fecha.setHours(count)
    }
    else{
        start.setHours(count);
        fecha.setHours(count)*/
        
   var radiacion = new TablaRadiacion({dispositivo : "lol", fecha: fecha, uv: random(), hora: hora});
     // console.log(fecha+" "+random()+" "+start)
      radiacion.save(function (err, radiacionNueva, numberAffected) {
                  if (err) {
                    console.error(err);
                    res.send('Error');
                  } else {
                    console.log('historial creado:');
                 //   console.log(radiacionNueva);
                  }
                  

                });
       // count++;
 //   }
}            