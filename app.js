const createError = require('http-errors')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const sassMiddleware = require('node-sass-middleware');
const { Pool } = require('pg')
const session = require('express-session');

const indexRouter = require('./routes/index');
const loginRouterFactory = require('./routes/login.js')
const registerRouterFactory = require('./routes/register.js')
const homeRouterFactory = require('./routes/home.js')

const dbPool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'auth-db',
  password: 'postgres',
  port: 5432,
})

const requireLogin = (req, res, next) => {
  if (!req.session.user) {
    res.redirect('/login')
  }
  next()
}

const loginRouter = loginRouterFactory(dbPool)
const registerRouter = registerRouterFactory(dbPool)
const homeRouter = homeRouterFactory()

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(sassMiddleware({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: true, // true = .sass and false = .scss
  sourceMap: true
}));
app.use(express.static(path.join(__dirname, 'public')));

app.use(session(
  {
    secret: 'auth-secret',
  }
))


app.use('/', indexRouter)
app.use('/login', loginRouter)
app.use('/register', registerRouter)
app.use('/secure', requireLogin)
app.use('/secure/home', homeRouter)


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
