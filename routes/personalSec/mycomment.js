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
            res.render('personalSec/mycomment', {
                title: 'MyComment',
                name: 'Daily Cate',
                user: req.user,
                imgpath: '../profileimgs/' + req.user.username,
                commentno:result1
            });
            console.log("you do not have any comment");
        }
        else{
            var string=[];
            var string2=[];
            for(var i=0;i<result1;i++){
                string[i]='../exhibitionSec/pictures/'+(result2[i].picturestart+result2[i].pictureno-1).toString();
                string2[i]=result2[i].content;
            }
            res.render('personalSec/mycomment', {
                title: 'MyComment',
                name: 'Daily Cate',
                user: req.user,
                imgpath: '../profileimgs/' + req.user.username,
                commentno:result1,
                result:result2,
                coverpic:string,
                text:string2
            });
        }
    });



});

router.post('/', function (req, res, next) {
    var result = req.body.result;
    console.log('result: ', result);

    if (result !== '' && result !== undefined) {
        new Promise(
            function (resolve, reject) {
                resolve(encodeURIComponent(result[0]));
            }
        ).then(function (value) {
            res.redirect('../exhibitionSec/articlePost?articleId=' + value);
        });
    }else{
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