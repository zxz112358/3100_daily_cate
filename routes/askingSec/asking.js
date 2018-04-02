
/* GET helpPost page. */

module.exports = router;


var express = require('express');
var router = express.Router();

var test = require('../test');
var fs=require("fs");

/* GET exhibition page. */
router.get('/', function(req, res, next) {
    test.select_all_article('help', function(result1,result2){
        if(result1===0){
            var all = undefined;
        }
        else{
            var all = result2;
        }

        test.select_article_list('main', 'help', function (num, mainlist) {
            if (num === 0){
                var main = undefined;
            } else {
                var main = mainlist;
            }

            test.select_article_list('dish', 'help', function (num, dishlist) {
                if (num === 0){
                    var dish = undefined;
                } else {
                    var dish = dishlist;
                }

                test.select_article_list('soup', 'help', function (num, souplist) {
                    if (num === 0) {
                        var soup = undefined;
                    } else {
                        var soup = souplist;
                    }

                    test.select_article_list('dessert', 'help', function (num, dessertlist) {
                        if (num === 0) {
                            var dessert = undefined;
                        } else {
                            var dessert = dessertlist;
                        }
                        test.select_article_list('ingredient', 'help', function (num, ingredientlist) {
                            if (num === 0) {
                                var ingredient = undefined;
                            } else {
                                var ingredient = ingredientlist;
                            }
                            res.render('askingSec/asking', {
                                title: 'Help Post',
                                name:'Daily Cate',
                                user: req.user,
                                allArticle: all,
                                main:main,
                                dish:dish,
                                soup:soup,
                                dessert:dessert,
                                ingredient:ingredient
                            });
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

    new Promise(
        function (resolve, reject) {
            if (result[0] === 'all'){
                test.select_all_article('help', function(num, articleList){
                    resolve(encodeURIComponent(articleList[result[1]].articleID));
                })
            } else {
                test.select_article_list(result[0], 'help', function(num, articleList){
                    resolve(encodeURIComponent(articleList[result[1]].articleID));
                })
            }
        }
    ).then(function (value) {
        res.redirect('./helpPost?articleId=' + value);
    });
});

module.exports = router;
console.log("this is the Asking for help page!");