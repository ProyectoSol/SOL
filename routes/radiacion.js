var express = require('express');
var app = express();

var TablaRadiacion = require('../models/TablaRadiacion.js');
var TablaHistorial = require('../models/TablaHistorial.js');
var EstadisticaSemana = require('./estadisticaSemana.js');
var EstadisticaHora = require('./estadisticaHora.js');
var EstadisticaAnual = require('./estadisticaAnual.js');

exports.insert = function(req, res) {
    //------------------------------------------comprobar existencia del dispositivo y update
    var disp_nombre = req.params.disp_nombre;
    var uv = req.params.uv;
    //radiacion
    TablaRadiacion.findOne({'dispositivo': disp_nombre}, function(err, disp) {
        if (!disp) {

            //insertar dispositivo nuevo y radiacion
            var uvNuevo = new TablaRadiacion({
                dispositivo: disp_nombre,
                uv: uv
            });
            console.log(uvNuevo.uv);

            uvNuevo.save(function(err, anadirUv, numberAffected) {
                if (err) {
                    console.error(err);
                    res.send('Error');
                }
                else {
                    console.log('Radiación registrada');
                    console.log(anadirUv);
                    // res.json(anadirUv);
                }
            });

        }
        else {
            //actualizar datos de un dispositivo
            //radiacion
            TablaRadiacion.update({
                dispositivo: disp.dispositivo
            }, {
                uv: uv
            }, function(radiacion) {
                console.log("El dispositivo se ha actualizado");
            });
        };
        //-------------------------insertar en el historial
        var fecha = new Date();
        var historialNuevo = new TablaHistorial({
            dispositivo: disp_nombre,
            uv: uv,
            fecha: fecha,
            hora: getHora(),
            diaSemana: getDiaSemana()
        });

        historialNuevo.save(function(err, anadirHistorial, numberAffected) {
            if (err) {
                console.error(err);
                res.send('Error');
            }
            else {
                console.log('historial registrada');
                console.log(anadirHistorial);
                res.json(anadirHistorial);
            }
        });


    });

};

//---------------coger ultimo indice de radiacion--------
exports.mostrar = function(req, res) {

    if (!req.session.a) {
        console.log("sesion fallida")
        res.redirect('/');
    }
    else {

        //  radiacion.mostrar(req, res);


        //console.log("lol "+getFecha())
        //radiacion
        TablaRadiacion.findOne({'dispositivo': req.session.dispositivo}, function(err, Ruv) {
            if (err) {
                console.error(err);
                res.send('Error');
            }
            else {
                global.nivel;
                global.nivel = Ruv.uv;

                var nivelfinal = global.nivel;
                var fecha = new Date();
                var Hace7Dias = new Date();

                Hace7Dias.setDate(fecha.getDate() - 7);

                var dispositivo = req.session.dispositivo;
                EstadisticaSemana.Semana(req, res, dispositivo);
                EstadisticaHora.Hora(req, res, dispositivo);
                EstadisticaAnual.anual(req,res,dispositivo)
            
            
            
                res.render('login', {
                    User: req.session.a,
                    Uv: nivelfinal,
                    max: global.max,
                    min: global.min,
                    meteo: global.datodia,
                    //  Esemana: radiacion,
                    Esemana: global.radiacionF,
                    EsemanaDia: global.fechaF,
                    Fototipo: global.fototipo,
                    RadiacionHora: global.radiacionH,
                    HoraR: global.horaR,
                    RadiacionAnual: global.radiacionA,
                    anoA: global.fechaAnual

                });

            }
        }).sort({
            _id: -1
        });
    }
};


function getFecha() {
    var fecha = new Date();
    var ano = fecha.getFullYear();
    var mes = fecha.getMonth() + 1;
    var dia = fecha.getUTCDate();

    var fechaCompleta = mes + "/" + dia + "/" + ano;

    return (fechaCompleta);
}

function getDiaSemana() {
    var fecha = new Date();
    var diaSem = fecha.getDay();

    return (diaSem);
}

function getHora() {
    var fecha = new Date();
    var hora = fecha.getHours();
    var min = fecha.getMinutes();

    if (min < 10) {
        min = "0" + min;
    }

    var horaCompleta = hora;

    return (horaCompleta);
}
