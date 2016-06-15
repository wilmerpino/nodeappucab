var express = require('express');
var router = express.Router();

var models =  require("../models/personal/personas.js");
var modelsLocalidades = require('../models/personal/localidades.js');
var modelsGradoAcademico = require('../models/personal/gradoAcademico.js');

router.get('/:cedula?', function(req, res, next){
    var id = req.params.cedula;
    
    if(id === undefined){
        models.Personas.findAll().then(function (persona) {
            res.json(persona);
        });
    }else{
        models.Personas.findOne({
                where: {id: id},                
                //attributes: ['nombre','cedula','correo1'],
                include : [{
                    model : modelsLocalidades.Localidades,
                    attributes: ['nombre_localidad'],
                    as : "localidades"
                },
                {
                    model : modelsGradoAcademico.gradoAcademico,
                    attributes: ['grado_academico'],
                    as : "grado_academico"
                }]
            }).then(function (persona) {
            res.json(persona);
        });
    }
    
    //res.send('nombre');
});

module.exports = router;