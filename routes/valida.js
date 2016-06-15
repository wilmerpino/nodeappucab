var express = require('express');
var router = express.Router();

router.post('/', function (req, res, next) {
    if (!req.body)
        return res.sendStatus(400);

    var login = req.body.login;
    //var password = req.body.password;
    var models = require("../models/personas.js")

    models.Personas.findOne(
            {
                where: {login: login}/*,
                attributes: ['cedula', 'nombre_usuario', 'extension', 'correo_ucab']*/
            }).then(function (persona) {
        res.render("personas.html", {
            persona: persona            
        });
    });
});

module.exports = router;
