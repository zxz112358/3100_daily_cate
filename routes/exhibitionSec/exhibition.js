var express = require('express');
var router = express.Router();

var test = require('../test');
var fs=require("fs");

/* GET exhibition page. */
router.get('/', function(req, res, next) {
    test.select_all_article('article', function(result1,result2){
        if(result1===0){
            var all = undefined;
        }
        else{
            var all = result2;
        }

        test.select_article_list('main', 'article', function (num, mainlist) {
            if (num === 0){
                var main = undefined;
            } else {
                var main = mainlist;
            }

            test.select_article_list('dish', 'article', function (num, dishlist) {
                if (num === 0){
                    var dish = undefined;
                } else {
                    var dish = dishlist;
                }

                test.select_article_list('soup', 'article', function (num, souplist) {
                    if (num === 0) {
                        var soup = undefined;
                    } else {
                        var soup = souplist;
                    }

                    test.select_article_list('dessert', 'article', function (num, dessertlist) {
                        if (num === 0) {
                            var dessert = undefined;
                        } else {
                            var dessert = dessertlist;
                        }

                        res.render('exhibitionSec/exhibition', {
                            title: 'Exhibition',
                            name:'Daily Cate',
                            user: req.user,
                            allArticle: all,
                            main:main,
                            dish:dish,
                            soup:soup,
                            dessert:dessert
                        });
                    });
                });
            });
        });
    });
});

router.post('/', function (req, res, next) {
    var result = String(req.body.result).match(/[^\d]+|\d+/g);//result[0] is tag, result[1] is index
    console.log('result: ', result);

    if (result[0] !== '' && result[0] !== 'undefined') {
        new Promise(
            function (resolve, reject) {
                if (result[0] === 'all') {
                    test.select_all_article('article', function (num, articleList) {
                        resolve(encodeURIComponent(articleList[result[1]].articleID));
                    })
                } else {
                    test.select_article_list(result[0], 'article', function (num, articleList) {
                        resolve(encodeURIComponent(articleList[result[1]].articleID));
                    })
                }
            }
        ).then(function (value) {
            res.redirect('./articlePost?articleId=' + value);
        });
    }else{
        //search handling
        console.log(req.body.searchname);
        var searchname = encodeURIComponent(req.body.searchname);
        res.redirect('../personalSec/search?searchname=' + searchname);
    }
});

module.exports = router;
console.log("this is the exhibition page!");