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
router.post('/', function (req, res, next) {
    var followinguser = String(req.body.followinguser);//username
    var username = encodeURIComponent(followinguser);

    res.redirect('./userpostpage?username=' + username);
    // if (req.body.result[0] !== ''){
    //     new Promise(
    //         function (resolve, reject) {
    //             test.select_all_client_article(req.user.username, function (num, articleList) {
    //                 resolve(encodeURIComponent(articleList[result[0]].articleID));
    //             });
    //         }
    //     ).then(function (value) {
    //         res.redirect('../exhibitionSec/articlePost?articleId=' + value);
    //     });
    // }else {
    //     var i=id.length;
    //     var valid='';
    //     for(var j=0;j<i;j++){
    //         if(id[j]!==''){
    //             valid = id[j];
    //         }
    //     }
    //     console.log('valid: ',valid);
    //     test.delete_article(valid);
    //     res.redirect('profile');
    // }
    // }
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