var express = require('express');
var router = express.Router();

var models =  require("../models/personal/localidades.js")

router.get('/', function(req, res, next){
    models.Localidades.findAll().then(function (localidad) {
        res.json(localidad);
    });
    
});

module.exports = router;
