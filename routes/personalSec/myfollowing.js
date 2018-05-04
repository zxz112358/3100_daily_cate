// var express = require('express');
// var router = express.Router();
//
// /* GET home page. */
// router.get('/', function(req, res, next) {
//     res.render('personalSec/myfollowing', {
//         title: 'Home',
//         name:'Daily Cate'
//     });
// });
//
// module.exports = router;
// console.log("this is the following page!");
var express = require('express');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var router = express.Router();

var test = require('../test');
var connection = test.connection;

/* GET user profile page. */
router.get('/', authenticationMiddleware(), function(req, res, next) {
    test.select_my_followings(req.user.username,function(result1,result2){
        //result1: follower number, result2: follower list
        //print the table includes all user2
        var string=[];
        for(var i=0;i<result1;i++){
            string[i] ='../profileimgs/'+(result2[i].user2).toString();
            console.log(string[i]);
        }
        if(result1===0){
            res.render('personalSec/myfollowing', {
                title: 'Profile',
                name: 'Daily Cate',
                user: req.user,
                imgpath: '../profileimgs/' + req.user.username,
                followingno:result1
            });
            console.log("no followings");
        }
        else{
            res.render('personalSec/myfollowing', {
                title: 'Profile',
                name: 'Daily Cate',
                user: req.user,
                imgpath: '../profileimgs/' + req.user.username,
                followingno:result1,
                following:result2,
                followingimg:string
            });
        }
    });
});

/* handle POST requests: enter clicked user page; search */
router.post('/', function (req, res, next) {
    var followinguser = req.body.followinguser;//username
    var username = encodeURIComponent(followinguser);
    if (req.body.id !== undefined) {
        var id = (typeof (req.body.id) === "string") ? req.body.id : req.body.id[0];
    }

    if (req.body.followinguser || id) {
        //enter following user's page
        if (id) {
            test.unfollow(req.user.username, id);
            res.redirect('myfollowing');
        }
        else {
            console.log('fdsdf');
            res.redirect('./userpostpage?username=' + username);
        }
    }else {
        //search handling
        console.log(req.body.searchname);
        var searchname = encodeURIComponent(req.body.searchname);
        res.redirect('../personalSec/search?searchname=' + searchname);
    }


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