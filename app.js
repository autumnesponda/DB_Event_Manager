var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mysql = require('mysql');
var session = require('express-session');

dbCredentials = require("./db_credentials.json");

var indexRouter = require('./routes/index');
var registerRouter = require('./routes/register');
var eventListRouter = require('./routes/eventList');
var createEventRouter = require('./routes/createEvent');
var createUniRouter = require('./routes/createUni');
var createRSORouter = require('./routes/createRSO');

var app = express();

dbConnection = mysql.createConnection({
  host: dbCredentials.serverIp,
  user: dbCredentials.username,
  password: dbCredentials.password,
  database: dbCredentials.dbName,
});

SALT_WORK_FACTOR = 10;

dbConnection.connect(function(err) {
  if (err) {
    console.log("Error connecting to sql database: " + err.stack);
    return;
  }

  console.log("Successfully connected to sql server @ address: " + dbCredentials.serverIp);
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Configure session data
app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: "secret!",
  key: "",

  hasError: false,
  errorMessage: "",
  hasRegisterSuccess: false,
  uid: "",
  displayName: ""
}));

// Configure body-parser
var bodyParser = require('body-parser');
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

app.use('/', indexRouter);
app.use('/register', registerRouter);
app.use('/eventList', eventListRouter);
app.use('/createEvent', createEventRouter);
app.use('/createUni', createUniRouter);
app.use('/createRSO', createRSORouter);

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