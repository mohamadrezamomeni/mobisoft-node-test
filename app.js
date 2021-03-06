var express = require('express');
var path = require('path');
var logger = require('morgan');




var app = express();



app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

require('./services/init')(app);
require('./routes')(app);
require('./services/errorHandler')(app);

module.exports = app;
