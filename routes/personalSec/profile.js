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

            if(result1===0){
                res.render('personalSec/profile', {
                    title: 'Profile',
                    name: 'Daily Cate',
                    user: req.user,
                    imgpath: '../profileimgs/' + req.user.username,
                    articleno:result1

                });
            }
            else{
                res.render('personalSec/profile', {
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
        }
    );
});

router.post('/', function (req, res, next) {
    var result = req.body.result;
    var id = req.body.id;
    console.log('result: ', result);

    if (req.body.result[0]){
        new Promise(
            function (resolve, reject) {
                console.log('username: ', req.user.username);
                resolve(encodeURIComponent(result[0]));
                console.log('articleId: ', result[0]);
            }
        ).then(function (value) {
            res.redirect('../exhibitionSec/articlePost?articleId=' + value);
        });
    }else if (id) {
        var i=id.length;
        var valid='';
        for(var j=0;j<i;j++){
            if(id[j]!==''){
                valid = id[j];
            }
        }
        console.log('valid: ',valid);
        var test = require('../delete_article');
        test.select_article(valid,function(article){
            var parastart=article.parastart;
            var parano=article.parano;
            test.delete_article_comment(valid,function(result1){
                if(result1==true){
                    test.delete_followarticle(valid,function(result2){
                        if(result2==true){
                            test.delete_article(valid,function(result3){
                                if(result3==true){
                                    for(var i=0;i<parano;i++){
                                        var id=parano+i;
                                        test.delete_paragraph(id);
                                        test.delete_picture(id);
                                    }

                                }
                            });
                        }
                    });
                }
            });

        })
        res.redirect('profile');
    }
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