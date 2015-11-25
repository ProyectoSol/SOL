var express = require('express');
var mongoose = require('mongoose');
var app = express();
var bodyParser = require('body-parser');
var Mailgun = require('mailgun').Mailgun;
var mg = new Mailgun('key-895d8c83afc89fdfe4dbbc0f77914001');

// database connection
mongoose.connect('mongodb://sol:sol@ds053954.mongolab.com:53954/proyectosol');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback() {
	console.log('Se ha conectado correctamente con la base de datos :D');
});

app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));
app.use(express.urlencoded()); // to support URL-encoded bodies

app.use(express.static(__dirname +'/public'));

app.get('/', function(req, res) {
    res.redirect('index.html');
});

var usuario;
var email;
var pass;
var pass2;

var usuarioEsquema = mongoose.Schema({
    usuario: String,
    email: String,
    pass: String
},{ collection : 'usuario' });

var User = mongoose.model('User', usuarioEsquema);

app.post('/insert', function(req, res) {
    usuario = req.body.usuario;
    email = req.body.email;
    pass = req.body.pass;
    pass2 = req.body.pass2;
    

app.get('/insert/usuario', function(req, res){
  var User = new User({ usuario: req.params.usuario, email: req.params.email, pass: req.params.pass  });
  console.log(User.usuario); // 'Silence'

  usuario.save(function (err, anadirusuario, numberAffected) {
    if (err) {
      console.error(err);
      res.send('Error');
    } else {
      console.log('usuario creado:');
      console.log(anadirusuario);
      res.json(anadirusuario);
    }
  });

});

   console.log(usuario);
   res.send('Usuario: ' + usuario+" email: "+email+" pass: "+pass+" pass2: "+pass2);

    
})

mg.sendText('deivoz14@gmail.com', ['Recipient 1 <deivoz14@gmail.com>', 'deivoz14@gmail.com'],
  'This is the subject',
  'This is the text',
  'deivoz14@gmail.com', {},
  function(err) {
    if (err) console.log('Oh noes: ' + err);
    else     console.log('Success');
});

var server = app.listen(process.env.PORT || 3000, function(){
    console.log('Listening in port %d', server.address().port);
});



