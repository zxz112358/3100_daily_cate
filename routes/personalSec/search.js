var express = require('express');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var router = express.Router();

var test = require('../test');
var connection = test.connection;
var fs=require("fs");

/* GET user search page. */
router.get('/', function(req, res) {
    /*req.on('data',function (data) {
        test.search(decodeURIComponent(data),function(results){
            if (results === undefined){
                //console.log(results);
                var results1= undefined;
            }
            else {
                console.log(results);
                var results1 = results;
            }
            res.render('personalSec/search', {
                title: 'search',
                name: 'Daily Cate',
                user: req.user,
                results:results1
            });
        });
    });*/
    test.search(req.query.searchname,function(results){
        if (results === undefined){
            //console.log(results);
            var results1= undefined;
        }
        else {
            //console.log(results);
            var results1 = results;
        }
        res.render('personalSec/search', {
            title: 'search',
            name: 'Daily Cate',
            user: req.user,
            results:results1
        });
    });
});

router.post('/', function (req, res, next) {
    //search handling
    console.log(req.body.searchname);
    var searchname = encodeURIComponent(req.body.searchname);
    res.redirect('../personalSec/search?searchname=' + searchname);
});

/*router.post('/', function (req, res, next) {
    var result = String(req.body.result).match(/[^\d]+|\d+/g);
    console.log('result: ', result);

    new Promise(
        function (resolve, reject) {
            test.select_all_client_article(req.user.username,function(num, articleList){
                resolve(encodeURIComponent(articleList[result[0]].articleID));
            });
        }
    ).then(function (value) {
        res.redirect('../exhibitionSec/articlePost?articleId=' + value);
    });
});

/* Check user's authentication, if not logged in, redirect user to log in page */
/*function authenticationMiddleware () {
    return function (req, res, next){
        //console.log('user:', req.session.passport.user);

        if (req.isAuthenticated()) {
            return next();
        }else{
            res.redirect('signin');
        }
    }
}*/


module.exports = router;