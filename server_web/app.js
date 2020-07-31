var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/public_web', express.static(path.join(__dirname, 'public_web')));
app.use('/public_manager', express.static(path.join(__dirname, 'public_manager')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

module.exports = app;
