var express = require('express');
var router = express.Router();

var models =  require("../models/personal/personal.js")

router.get('/:id?', function(req, res, next){
    var id = req.params.id;
    
    if(id == undefined){
        models.Unidades.findAll().then(function (unidad) {
            res.json(unidad);
        });
    }else{
        models.Unidades.findOne({
                where: {id: id}/*,
                attributes: ['cedula', 'nombre_usuario', 'extension', 'correo_ucab']*/
            }).then(function (unidad) {
            res.json(unidad);
        });
    }
    
    //res.send('nombre');
});

module.exports = router;
