var express = require('express');
var router = express.Router();

var modelsPersonas   = require('../models/personal/personas.js');
var modelsCargos     = require('../models/personal/cargos.js');
var modelsUnidades   = require('../models/personal/unidades.js');
var modelsTipoNomina = require('../models/personal/tipoNomina.js');
var models           = require("../models/personal/personasUnidad.js")

router.get('/:cedula?', function (req, res, next) {
    var id = req.params.cedula;    
    
    if (id === null || id === '')
        return res.sendStatus(400)
        
    models.personasUnidad.findAll({        
        where: {
            cedula: id//, prioridad: 1, fecha_egreso: null
        },
        attributes: ['fecha_ingreso','fecha_egreso','cant_horas'],
        include : [{
                    model : modelsPersonas.Personas,
                    //attributes: ['nombre_usuario'],                   
                    as : "personas"
            },
            {
                    model : modelsUnidades.Unidades,
                    //attributes: ['nombre_unidad'],                   
                    as : "unidad"
            },        
            {
                    model : modelsCargos.Cargos,
                    attributes: ['nombre_cargo'],                   
                    as : "cargo"
            },        
            {
                    model : modelsTipoNomina.tipoNomina,
                    //attributes: ['descripcion_tipo_nomina'],                   
                    as : "tipo_nomina"
            }]
    }).then(function (personasUnidad) {
       /* models.personasUnidad.updateAttributes({
            fecha_inicio :  personasUnidad.fecha_inicio //connect.fn('date_format', sequelize.col('date_col'), '%Y-%m-%d'), 'date_col_formed');
        }),*/
        res.json(personasUnidad);
    });;

})


module.exports = router;
