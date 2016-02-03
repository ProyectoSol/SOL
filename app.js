var express = require('express');
var conexionBD = require('./routes/conexion.js');
//var mongoose = require('mongoose');
conexionBD.conexion();
var app = express();
var bodyParser = require('body-parser');
var user = require('./routes/user.js');
//var tiempo = require('./routes/tiempo.js');
var radiacion = require('./routes/radiacion.js');
var contacto = require('./routes/contacto.js');
var admin = require('./routes/admin.js');
var session = require('express-session');
app.use(session({ resave: true,
                  saveUninitialized: true,
                  secret: 'uwotm8' }));
                  
//------------------------------------------------handlebars

var exphbs  = require('express-handlebars');

app.engine('handlebars',  exphbs());
app.set('view engine', 'handlebars');

//------------------------------------------------handlebars


app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));
app.use(express.urlencoded()); // to support URL-encoded bodies  

//---------------CONTROLLERS----
app.post('/usuario/registro', user.registro);
app.post('/activacion/:codigo', user.activacion);
app.post('/usuario/login', user.login);
app.post('/cambiopass/:codigo', user.cambiopass);
app.post('/updatenueva', user.updatenueva);
app.post('/configuracion', user.configuracion);
app.post('/fototipo', user.fototipo);
app.post('/consulta', contacto.consulta);
app.post('/recuperacion', user.recuperacion);
app.get('/admin', admin.verUsuarios);
app.post('/informacion', user.info);
app.get('/logout', user.logout);
app.get('/radiacion/insert/:disp_nombre/:uv', radiacion.insert);
app.get('/home',radiacion.mostrar);


app.use(express.static(__dirname +'/views'));

app.get('/', function(req, res) {
    res.render('index', {eusuario: "",
                        eemail: "",
                        epass: "",
                        epassb: ""
                        
                         });
    //res.redirect('index.handlebars');
    
});


setInterval(user.alertas1, 1800000);
setInterval(user.alertas2, 3600000);
setInterval(user.alertas3, 7200000);
//setInterval(radiacion.media, )





//-----------------prueba Estadistica con aggregate avg
var estadistica = require("./routes/estadistica.js");
app.get('/estadistica',function(req, res) {
     
    console.log("ejecutado estadistica.js")
    estadistica.mostrar(req, res);
    
});







var port = process.env.OPENSHIFT_NODEJS_PORT || process.env.PORT || 3000;
var ip = process.env.OPENSHIFT_NODEJS_IP || process.env.IP || "127.0.0.1";

var server = app.listen(port, ip, function(){
    console.log('Listening in port %d', server.address().port);
});