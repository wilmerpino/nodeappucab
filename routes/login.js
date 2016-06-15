var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('login.html', { title: 'Login', error: false });
});

/*router.post('/valida', function (req, res, next) {
    if (!req.body)
        return res.sendStatus(400);

    var login = req.body.login;
    //var password = req.body.password;
    var models = require("../models/personas.js")

    models.Personas.findById(
            {
                where: {login: login}
            }).then(function (persona) {
        res.render("persona.html", {
            persona: {
                nombre: nombre,
                correo: correoUcab,
                ext: extension
            }
        });
    });
});
*/
module.exports = router;
