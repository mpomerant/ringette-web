var express = require('express')
var proxy = require('http-proxy-middleware');



var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const getColors = require('get-image-colors');

// config files
var app = express();


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.get('/color/:teamId', function(req, res, next){
    var id = req.params.teamId;
    console.log('ID: ' + id);
    var file = path.join(__dirname, 'web', 'css','images', 'team', id + '.png' );
    console.log('file: ' + file);



    getColors(file).then(colors => {
        var hex = "blue"
        if (colors && colors.length){
            hex = colors[0].hex();
        }
        res.json({color: hex});
    });
});
app.use('/api', proxy({target: 'http://localhost:3000', changeOrigin: false}));
app.use(express.static(path.join(__dirname, 'web')));



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
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;

