var express = require('express');
var conexionBD = require('./routes/conexion.js');
//var mongoose = require('mongoose');
var app = express();
var bodyParser = require('body-parser');
var user = require('./routes/user.js')


app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));
app.use(express.urlencoded()); // to support URL-encoded bodies

app.use(express.static(__dirname +'/public'));

app.get('/', function(req, res) {
    res.redirect('index.html');
});

// model
conexionBD.conexion();

app.post('/insert/usuario', function(req, res){

  var usuariov = req.body.usuario;
  var emailv = req.body.email;
  var passv = req.body.pass;
  var pass2v = req.body.pass2;
  
  user.registro(req, res, usuariov, emailv, passv, pass2v);
});


app.post('/login', function(req, res){

  var emailL = req.body.email;
  var passL = req.body.pass;
  
  user.login(req, res, emailL, passL);
});



var port = process.env.OPENSHIFT_NODEJS_PORT || process.env.PORT || 3000;
var ip = process.env.OPENSHIFT_NODEJS_IP || process.env.IP || "127.0.0.1";

var server = app.listen(port, ip, function(){
    console.log('Listening in port %d', server.address().port);
});

