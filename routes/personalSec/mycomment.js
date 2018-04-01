// var express = require('express');
// var router = express.Router();
//
// /* GET home page. */
// router.get('/', function(req, res, next) {
//     res.render('personalSec/mycomment', {
//         title: 'Home',
//         name:'Daily Cate'
//     });
// });
//
// module.exports = router;
// console.log("this is the comment page!");
var express = require('express');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var router = express.Router();

var test = require('../test');
var connection = test.connection;

/* GET user profile page. */
router.get('/', authenticationMiddleware(), function(req, res, next) {

    test.select_client_comment(req.user.username,function(result1,result2){
        if(result1===0){
            console.log("you do not have any comment");
        }
        else{
            res.render('personalSec/mycomment', {
                title: 'Profile',
                name: 'Daily Cate',
                user: req.user,
                imgpath: '../profileimgs/' + req.user.username,
                commentno:result1,
                result:result2
            });
        }
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