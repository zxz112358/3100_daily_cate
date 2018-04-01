// var express = require('express');
// var router = express.Router();
//
// /* GET home page. */
// router.get('/', function(req, res, next) {
//     res.render('personalSec/mylike', {
//         title: 'Home',
//         name:'Daily Cate'
//     });
// });
//
// module.exports = router;
// console.log("this is the like page!");
var express = require('express');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var router = express.Router();

var test = require('../test');
var connection = test.connection;

/* GET user profile page. */
router.get('/', authenticationMiddleware(), function(req, res) {
    test.select_article_like(req.user.username, function (arID) {
        //console.log(arID+"!!!");
        //Object.keys(arID).forEach(function (key) {
            //console.log(arID+"!!!");
            test.select_article(arID, function (results) {
                res.render('personalSec/mylike', {
                    title: 'Mylike',
                    name: 'Daily Cate',
                    user: req.user,
                    imgpath: '../profileimgs/' + req.user.username,
                    arname: results.articlename,
                    potime: results.posttime,
                    auname: results.authorname,
                    lastpic: results.picturestart + results.pictureno - 1
                });
            });
        });
    //});
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