
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');

var app     = express();
var inspect = require('eyes').inspector({stream: null});

global._   = require('underscore');
global.log = function(){
  var args = Array.prototype.slice.call(arguments);
  args[args.length - 1] = inspect(args[args.length - 1]);
  console.log.bind(console).apply(console, args);
};

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

require('./routes/routes')(app);

http.createServer(app).listen(app.get('port'), function(){
  log('Express server listening on port ' + app.get('port'));
});
