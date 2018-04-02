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

module.exports = router;
console.log("this is the exhibition page!");