var mongoose = require('mongoose');


exports.conexion = function() {

mongoose.connect('mongodb://sol:sol@ds053954.mongolab.com:53954/proyectosol');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback() {
	console.log('Se ha conectado correctamente con la base de datos :D');
});
}
