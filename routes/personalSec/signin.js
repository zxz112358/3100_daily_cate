var express = require('express');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var router = express.Router();

var test = require('../test');
var connection = test.connection;

/* GET sign in page. */
router.get('/', authenticationMiddleware(), function(req, res, next) {
    res.render('personalSec/signin', {
        title: 'Sign In',
        name: 'Daily Cate',
        signup_message: req.flash('signup_success'),
        message: req.flash('error'),
        user: req.user
    });
});

/* Check user's authentication, if already logged in, show messages */
function authenticationMiddleware () {
    return function (req, res, next){
        if (req.isAuthenticated()){
            req.flash('signup_success', 'You are already logged in!');
        }

        return next();
    }
}

router.post('/', passport.authenticate('local', {
    successRedirect: 'profile',
    failureRedirect: '/personalSec/signin',
    failureFlash : true
}));

passport.use(new LocalStrategy(
    function(username, password, done) {
        test.select_user(username,function(result){
            if(result===false){
                return done(null,false, { message: 'Username doe not exist.' });
            }
            else{
                console.log(result.username);
                console.log(result.email);
                console.log(result.password);

                if (result.password === password){
                    return done(null, result);
                } else {
                    return done(null,false, { message: 'Password incorrect.' });
                }

            }
        });
    }
));

passport.serializeUser(function(user, done) {
    done(null, {
        username: user.username,
        email: user.email,
        description: user.description
    });
});

passport.deserializeUser(function(user, done) {
    done(null, user);
});


module.exports = router;
