require('dotenv').config()

var createError = require('http-errors');
var express = require('express');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const authRouter = require("./routes/auth.routes");
const privateRouter = require('./routes/private-routes');

var app = express();

// Functional curling style of loading configuration
require('./config/db')
require('./config/global')(app)

const isLoggedIn = require('./middleware/isLoggedIn');

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/auth', authRouter)
app.use('/private', isLoggedIn, privateRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
// testg

