var express = require('express');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var router = express.Router();

var test = require('../test');
var connection = test.connection;
var fs=require("fs");

/* GET user profile page. */
router.get('/', authenticationMiddleware(), function(req, res, next) {

    test.select_all_client_article(req.user.username,function(result1,result2){
            var string1=[];
            var string2=[];
            var string3=[];

            for(var i=0;i<result1;i++){
                string1.push(result2[i].picturestart+result2[i].pictureno-1);
                string1[i]='../exhibitionSec/pictures/'+string1[i];
            }
            for(var i=0;i<result1;i++){
                string2.push(result2[i].parastart+result2[i].parano-1);
                string2[i]='./routes/exhibitionSec/texts/'+string2[i]+'.txt';
                var data=fs.readFileSync(string2[i]);
                string3.push(data.toString());
            }



            res.render('personalSec/myhelp', {
                title: 'Profile',
                name: 'Daily Cate',
                user: req.user,
                imgpath: '../profileimgs/' + req.user.username,
                articleno:result1,
                result: result2,
                coverpic:string1,
                text:string3

            });
        }


    );

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