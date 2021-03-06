var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');

var multer = require('multer');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/profileimgs/');
    },
    filename: function (req, file, cb) {
        var extArray = file.mimetype.split("/");
        var extension = extArray[extArray.length - 1];
        cb(null, req.body.name);
    }
});
var upload = multer({ storage: storage });
var fs = require("fs");
var aio = require('array-indexof-object');

var aio = require('array-indexof-object');


var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mysql = require('mysql');
var MySQLStore = require('express-mysql-session')(session);

var expressValidator = require('express-validator');
var flash = require('connect-flash');

var index = require('./routes/index');
var ingredient = require('./routes/ingredientSec/ingredient');
var ingredientPost = require('./routes/ingredientSec/ingredientPost');
var exhibition = require('./routes/exhibitionSec/exhibition');
var exhposting = require('./routes/exhibitionSec/exhposting');
var articlePost = require('./routes/exhibitionSec/articlePost');
var asking = require('./routes/askingSec/asking');
var helpPost = require('./routes/askingSec/helpPost');
var signup = require('./routes/personalSec/signup');
var signin = require('./routes/personalSec/signin');
var signout = require('./routes/personalSec/signout');
var profile = require('./routes/personalSec/profile');
var search = require('./routes/personalSec/search');
var myhelp = require('./routes/personalSec/myhelp');
var modifypage = require('./routes/personalSec/modifypage');
var homepage = require('./routes/homepage/homepage');
var mycomment = require('./routes/personalSec/mycomment');
var myfollowing = require('./routes/personalSec/myfollowing');
var myfollower = require('./routes/personalSec/myfollower');
var mylike = require('./routes/personalSec/mylike');
var userpostpage = require('./routes/personalSec/userpostpage');
var search = require('./routes/personalSec/search');

var test = require('./routes/test');


var app = express();


var test = require('./routes/test');
var connection = test.connection;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

var options = {
    "host": "localhost",
    "port": 3306,
    "user": "root",
    "password": "123123",
    "database": "csci3100"
};
var sessionStore = new MySQLStore(options);

//express session
app.use(session({
    secret: 'secret',
    saveUninitialized: false,
    resave: false,
    store: sessionStore
}));

//Passport
app.use(passport.initialize());
app.use(passport.session());

app.use(function (req, res, next) {
    res.locals.isAuthenticated = req.isAuthenticated();
    next();
});

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'routes')));

app.use(flash());


//Validator
app.use(expressValidator({
    errorFormatter: function (param, msg, value, location) {
        var namespace = param.split('.')
            , root = namespace.shift()
            , formParam = root;

        while(namespace.length){
            formParam += '[' + namespace.shift() + ']';
        }
        return{
            param: formParam,
            msg: msg,
            value: value
        };
    },
    customValidators: {
        usernameNotExists: function afunction(username, email, password, description) {
            //if the username exists, return false; if not, return true
            return true;
        }
    }
}));

app.use(function(req, res, next){
    res.locals.messages = require('express-messages');
    next();
})
//-----

app.use('/', index);
app.use('/ingredientSec/ingredient', ingredient);
app.use('/ingredientSec/ingredientPost', ingredientPost);
app.use('/exhibitionSec/exhibition', exhibition);
app.use('/exhibitionSec/exhposting', exhposting);
app.use('/exhibitionSec/articlePost', articlePost);
app.use('/askingSec/asking', asking);
app.use('/askingSec/helpPost', helpPost);
app.use('/personalSec/signup', signup);
app.use('/personalSec/signin', signin);
app.use('/personalSec/signout', signout);
app.use('/personalSec/profile', profile);
app.use('/personalSec/search', search);
app.use('/personalSec/myhelp', myhelp);
app.use('/homepage/homepage',homepage);
app.use('/personalSec/mycomment',mycomment);
app.use('/personalSec/mylike',mylike);
app.use('/personalSec/myfollower',myfollower);
app.use('/personalSec/myfollowing',myfollowing);
app.use('/personalSec/userpostpage',userpostpage);
app.use('/personalSec/modifypage', modifypage);
app.use('/personalSec/search',search);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
