var express = require('express');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var router = express.Router();

var test = require('../test');
var delete_article = require('../delete_article');
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
    var id = req.body.id;
    if(id)
        var valid = (typeof (id) === "string")? id: id[0];

    if (valid) {
        console.log('id: ', req.body.id);
        console.log('valid: ',valid);
        delete_article.select_article(valid,function(article){
            var parastart=article.parastart;
            var parano=article.parano;
            delete_article.delete_article_comment(valid,function(result1){
                if(result1==true){
                    delete_article.delete_followarticle(valid,function(result2){
                        if(result2==true){
                            delete_article.delete_article(valid,function(result3){
                                if(result3==true){
                                    for(var i=0;i<parano;i++){
                                        var id=parano+i;
                                        delete_article.delete_paragraph(id);
                                        delete_article.delete_picture(id);
                                    }

                                }
                            });
                        }
                    });
                }
            });

        })
        res.redirect('back');
    }else if (req.body.searchname){
        //search handling
        console.log('search: ', req.body.searchname);
        var searchname = encodeURIComponent(req.body.searchname);
        res.redirect('../personalSec/search?searchname=' + searchname);
    } else if (req.body.result){
        console.log('result: ', req.body.result);
        var result = (typeof(req.body.result)==="string")? req.body.result:req.body.result[0];
        new Promise(
            function (resolve, reject) {
                console.log('username: ', req.user.username);
                resolve(encodeURIComponent(result));
                console.log('articleId: ', result);
            }
        ).then(function (value) {
            res.redirect('../exhibitionSec/articlePost?articleId=' + value);
        });
    }else {
        console.log('search: ', req.body.searchname);
        var searchname = encodeURIComponent(req.body.searchname);
        res.redirect('../personalSec/search?searchname=' + searchname);
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