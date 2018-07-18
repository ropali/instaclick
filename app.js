var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const bodyParser = require('body-parser');

const expressValidator = require('express-validator');
const expressSession = require('express-session');
require('dotenv').config();
const mongoose = require('mongoose');

const MongoStore = require('connect-mongo')(expressSession);

mongoose.connect('mongodb://test:test123@ds261660.mlab.com:61660/insta_click');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const postRouter = require('./routes/post');

var app = express();

// SessionStore
const store = new MongoStore({
  mongooseConnection: mongoose.connection,
  ttl: 86400000 // 24 Hr
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  limit: "50mb",
  extended: false
}));

app.use(bodyParser.json({ limit: "50mb" }));

app.use(expressValidator());



app.use(expressSession({
  secret: 'secret_key',
  saveUninitialized: false,
  resave: false,
  store: store,
  cookie: {
    maxAge: 86400000 // 24 Hr
  }
}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ 
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads',express.static('uploads'));

//app.use(bodyParser())


// Routes
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/post', postRouter);



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
