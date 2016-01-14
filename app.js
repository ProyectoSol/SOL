var express = require('express');
var conexionBD = require('./routes/conexion.js');
//var mongoose = require('mongoose');
conexionBD.conexion();
var app = express();
var bodyParser = require('body-parser');
var user = require('./routes/user.js');
var radiacion = require('./routes/radiacion.js');
var contacto = require('./routes/contacto.js');
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

app.use(express.static(__dirname +'/views'));

app.get('/', function(req, res) {
    res.redirect('index.html');
});

// model
//conexionBD.conexion();

app.post('/usuario/registro', function(req, res){

  var usuariov = req.body.usuario;
  var emailv = req.body.email;
  var passv = req.body.pass;
  var pass2v = req.body.pass2;
  
  user.registro(req, res, usuariov, emailv, passv, pass2v);
});


app.post('/usuario/login', function(req, res){
  
  var emailL = req.body.email;
  var passL = req.body.pass;
  

  user.login(req, res, emailL, passL);
  
});
//---------------------------prueba session

app.get('/home', function(req, res) {
    if (!req.session.a){
         res.redirect('index.html');
    }else{
        radiacion.mostrar(req, res);
    }

});
//----------------------------fin prueba session
app.post('/fototipo',function(req, res) {
    
    
     var pelo = req.body.cabello;
     var ojos = req.body.ojos;
     var piel = req.body.piel;
     var pecas = req.body.pecas;
     var rojo = req.body.eritema;
     var bronceado = req.body.bronceado;
    user.fototipo(req, res, pelo, ojos, piel, pecas, rojo, bronceado);
    
});
app.post('/informacion',function(req, res) {
    
    
     var nombre = req.body.name;
     var apellidos = req.body.apellidos;
     var fecha = req.body.fecha;
     var sexo  = req.body.sexo;
     
    user.info(req, res, nombre, apellidos, fecha, sexo);
    
});
//----------------consulta----------------------
app.post('/consulta',function(req, res) {
      var asunto = req.body.asunto;
      var email = req.body.email;
      var mensaje = req.body.field;
    //  console.log(asunto,email,mensaje)
      
    contacto.consulta(req, res, email, asunto, mensaje);
    
});

app.post('/recuperacion',function(req, res) {
     
      var email = req.body.email;
      
    //  console.log(asunto,email,mensaje)
      
    user.recuperacion(req, res, email);
    
});

app.get('/cambiopass/:codigo', function(req,res){
   
    var codigo = req.params.codigo;
    
    user.cambiopass(req,res,codigo);
});

app.post('/updatenueva', function(req,res){
    var pass1 = req.body.pass;
    var pass2 = req.body.pass2;
    
    if(pass1==pass2){
        user.updatenueva(req, res, pass1);
    }else{
        console.log('Las contraseñas no coinciden');
    }
});

app.get('/activacion/:codigo', function(req, res) {
    user.activacion(req,  res, req.params.codigo);
});
//-------------- LogOut

app.get('/logout', function(req, res) { user.logout(req,  res);});


//app.post('/')
app.get('/radiacion/insert/:disp_nombre/:uv', function(req, res) {
  
  var disp_nombre = req.params.disp_nombre;
  var uv = req.params.uv;
  
  radiacion.insert(req, res, disp_nombre, uv);
    
});



var port = process.env.OPENSHIFT_NODEJS_PORT || process.env.PORT || 3000;
var ip = process.env.OPENSHIFT_NODEJS_IP || process.env.IP || "127.0.0.1";

var server = app.listen(port, ip, function(){
    console.log('Listening in port %d', server.address().port);
});