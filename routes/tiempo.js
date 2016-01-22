var express = require('express');
var app = express();
var request = require('request');
var satelize = require('satelize');
var requestIp = require('request-ip');
// **********************************************


exports.recogertiempo = function(req, res){
	var clientIp = requestIp.getClientIp(req);
console.log(clientIp)
					
	satelize.satelize({ip: clientIp}, function(err,payload) {
 
  		var lat = payload.latitude;
  		var lon = payload.longitude;
  		console.log(lat+" "+lon);
  		console.log(payload);
  
  	var url = 'http://api.openweathermap.org/data/2.5/weather?lat='+lat+'&lon='+lon+'&appid=2de143494c0b295cca9337e1e96b00e0';

	request({url:url, json:"true"}, function (error, response, body) {
		if (!error && response.statusCode == 200) {
		
            global.datodia = body.weather[0].main;
            global.max = Math.round(body.main.temp_max -273);
            global.min =  Math.round(body.main.temp_min -273);
             console.log("tiempo "+global.max+" "+global.min+" "+global.datodia);
		} else {
			res.json({error:"request error"});
		}
	});
	});
	// Donostia. Zubiri-Manteo

};

