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
    test.select_article_like(req.user.username,function(result1,result2){
        //result1: article number, result2: article list
        var string=[];//picture location list
        for(var i=0;i<result1;i++){
            string.push(result2[i].picturestart+result2[i].pictureno-1);
            string[i]='../exhibitionSec/pictures/'+string[i];
        }
        if(result1===0){
            res.render('personalSec/mylike', {
                title: 'Mylike',
                name: 'Daily Cate',
                user: req.user,
                imgpath: '../profileimgs/' + req.user.username,
                artno:result1
            });
            console.log("no like articles");
        }
        else{
            res.render('personalSec/mylike', {
                title: 'Mylike',
                name: 'Daily Cate',
                user: req.user,
                imgpath: '../profileimgs/' + req.user.username,
                artno:result1,
                artinfo:result2,
                coverpic:string
            });
            console.log(result2);
        }

    });
});

/* Handle POST requests: enter clicked article; search */
router.post('/', function (req, res, next) {
    if (req.body.result) {
        //enter article
        var result = req.body.result;
        console.log('result: ', result);

        new Promise(
            function (resolve, reject) {
                resolve(encodeURIComponent(result[0]));
            }
        ).then(function (value) {
            res.redirect('../exhibitionSec/articlePost?articleId=' + value);
        });
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