const createError = require('http-errors');
const express = require('express');
const path = require('path');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const helmet = require('helmet');

const indexRouter = require('./src/routes/index');
const loginRouter = require('./src/routes/login');
const fileRouter = require('./src/routes/files');
const { getMongoClient } = require('./src/mongo-client');
const initIndices = require('./src/init-indices')
const app = express();

getMongoClient().then(initIndices).catch(_ => process.exit(1));
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        ...helmet.contentSecurityPolicy.getDefaultDirectives(),
        "script-src": ["'unsafe-inline'"],
      },
    },
  })
);
app.use(session({
  secret: "ABC 132 QWE",
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 60000 }
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/file', fileRouter);
app.use('/login', loginRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = err;

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
