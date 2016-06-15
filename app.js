var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var nunjucks = require("nunjucks");


var router = express.Router();

//var models = require(__dirname + '/../models');
var index = require('./routes/index');
var users = require('./routes/users');
var personas = require('./routes/personas');
var login = require('./routes/login');
var valida = require('./routes/valida');
var unidades = require('./routes/unidades');
var localidades = require('./routes/localidades');
var personasUnidad = require('./routes/personasUnidad');

var app = express();

// view engine setup

/*
app.engine("html", require("nunjucks").renderFile);
app.set('view engine', 'html')
*/
nunjucks.configure(__dirname + "/views", {
    //le asignamos el servidor de express
    express: app
});

/*app.engine("html", require("ejs").renderFile);
app.set('view engine', 'html');*/

/*app.engine("html", require("jade").renderFile);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');*/

// uncomment after placing your favicon in /public

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//rutas http
app.use('/', index);
app.use('/users', users);
app.use('/personas', personas);
app.use('/login', login);
app.use('/valida', valida);
app.use('/unidades', unidades);
app.use('/localidades', localidades);
app.use('/personasunidad', personasUnidad);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error.html', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error.html', {
    message: err.message,
    error: {}
  });
});

module.exports = app;

