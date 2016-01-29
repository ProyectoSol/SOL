var user = require('../models/users.js');
var mongoose = require("mongoose");

var user1 = mongoose.model('User1', user.userModel())
exports.verUsuarios = function(req, res){
    user1.find(function(error, listaUsuarios) {
        var arrayUsu = [];   
        for(var i=0;i<listaUsuarios.length;i++){
            arrayUsu.push(listaUsuarios[i].email);
            console.log(listaUsuarios[i].email);
        };
        
            res.render('admin', {usuarios: arrayUsu
                                
                                 });
                 
              
        });  
};