var express = require('express');
var app = express();
var request = require('request');
var satelize = require('satelize');
var requestIp = require('request-ip');
// **********************************************

function getHora(fecha) {
    var f = new Date(fecha*1000);
    var hora = f.getHours();
    var min = f.getMinutes();
    
    if (min < 10) {
        min = "0" + min;
    }
    
    var horaCompleta = hora+":"+min;
    
    return(horaCompleta);
}


exports.recogertiempo = function(req, res){
	var clientIp = requestIp.getClientIp(req);
//console.log(clientIp)
					
	satelize.satelize({ip: clientIp}, function(err,payload) {
 
  		var lat = payload.latitude;
  		var lon = payload.longitude;
  		console.log(lat+" "+lon);
  	//	console.log(payload);
  
  	var url = 'http://api.openweathermap.org/data/2.5/weather?lat='+lat+'&lon='+lon+'&appid=59de9afd3d5dda5070edadb7cc16e771';

	request({url:url, json:"true"}, function (error, response, body) {
		if (!error && response.statusCode == 200) {
		
            global.datodia = body.weather[0].main;
            global.city = body.name;
            global.max = Math.round(body.main.temp_max -273);
            global.min =  Math.round(body.main.temp_min -273);
            var sunrise = body.sys.sunrise;
            var sunset = body.sys.sunset;
            
            global.sunrise = getHora(sunrise);
            global.sunset = getHora(sunset);
            
            console.log("Sunrise y sunset: " + global.sunrise + global.sunset);
            console.log("Tiempo: "+global.max+" "+global.min+" "+global.datodia);
		} else {
		//	res.json({error:"request error"});
		console.log("error con el tiempo")
		}
	});
	});
	// Donostia. Zubiri-Manteo

};

