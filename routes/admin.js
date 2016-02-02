var user = require('../models/users.js');
var mongoose = require("mongoose");
var schema =require("../models/users.js");




exports.verUsuarios = function(req, res){
    
    
    
 /*   user1.find(function(error, listaUsuarios) {
        var arrayUsu = [];   
        for(var i=0;i<listaUsuarios.length;i++){
            arrayUsu.push(listaUsuarios[i].email);
            console.log(listaUsuarios[i].email);
        };
        
            res.render('admin', {usuarios: arrayUsu});
                 
              
        });  */
        
        schema.find(function(error, usuarios){
            var arrays = {datos:usuarios};
            
            res.render('admin', arrays);
        });
};