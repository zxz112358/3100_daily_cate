// var express = require('express');
// var router = express.Router();
//
// /* GET home page. */
// router.get('/', function(req, res, next) {
//     res.render('personalSec/myfollower', {
//         title: 'Home',
//         name:'Daily Cate'
//     });
// });
//
// module.exports = router;
// console.log("this is the follower page!");
var express = require('express');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var router = express.Router();

var test = require('../test');
var connection = test.connection;

/* GET user profile page. */
router.get('/', authenticationMiddleware(), function(req, res, next) {
    res.render('personalSec/myfollower', {
        title: 'Profile',
        name: 'Daily Cate',
        user: req.user,
        imgpath: '../profileimgs/' + req.user.username
    });
});

/* Check user's authentication, if not logged in, redirect user to log in page */
function authenticationMiddleware () {
    return function (req, res, next){
        console.log('user:', req.session.passport.user);

        if (req.isAuthenticated()) {
            return next();
        }else{
            res.redirect('signin');
        }
    }
}

module.exports = router;