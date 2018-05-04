var express = require('express');
var router = express.Router();
var test = require('../test');
var fs=require("fs");

/* GET ingredient page. */
router.get('/', function(req, res, next) {
    /* Obtain data in ingredient section */
    test.select_all_article('ingredient', function(result1,result2){
        if(result1===0){
            var all = undefined;
        }
        else{
            var all = result2;
        }
        /* Obtain articles with "vegetable" tag in ingredient section */
        test.select_article_list('vegetable', 'ingredient', function (num, vegetablelist) {
            if (num === 0){
                var vegetable = undefined;
            } else {
                var vegetable = vegetablelist;
            }
            /* Obtain articles with "fruit" tag in ingredient section */
            test.select_article_list('fruit', 'ingredient', function (num, fruitlist) {
                if (num === 0){
                    var fruit = undefined;
                } else {
                    var fruit = fruitlist;
                }
                /* Obtain articles with "meat" tag in ingredient section */
                test.select_article_list('meat', 'ingredient', function (num, meatlist) {
                    if (num === 0){
                        var meat = undefined;
                    } else {
                        var meat = meatlist;
                    }
                    /* Obtain articles with "grain" tag in ingredient section */
                    test.select_article_list('grain', 'ingredient', function (num, grainlist) {
                        if (num === 0){
                            var grain = undefined;
                        } else {
                            var grain = grainlist;
                        }
                        //render page
                        res.render('ingredientSec/ingredient', {
                            title: 'Ingredient',
                            name:'Daily Cate',
                            user: req.user,
                            allArticle: all,
                            vegetable: vegetable,
                            fruit:fruit,
                            meat:meat,
                            grain:grain
                        });
                    });
                });
            });
        });
    });
});

/* Handle POST requests: enter clicked article; search */
router.post('/', function (req, res, next) {
    var result = String(req.body.result).match(/[^\d]+|\d+/g);//result[0] is article tag, result[1] is index of article list
    console.log('result: ', result);

    if (result[0] !== '' && result[0] !== 'undefined') {
        new Promise(
            function (resolve, reject) {
                /* get displayed article list, find requested articleId */
                if (result[0] === 'all') {
                    test.select_all_article('ingredient', function (num, articleList) {
                        resolve(encodeURIComponent(articleList[result[1]].articleID));
                    })
                } else {
                    test.select_article_list(result[0], 'ingredient', function (num, articleList) {
                        resolve(encodeURIComponent(articleList[result[1]].articleID));
                    })
                }
            }
        ).then(function (value) {
            console.log('ingredient articleId: ', value);
            res.redirect('./ingredientPost?articleId=' + value);
        });
    }else{
        //search handling
        console.log(req.body.searchname);
        var searchname = encodeURIComponent(req.body.searchname);
        res.redirect('../personalSec/search?searchname=' + searchname);
    }
});

module.exports = router;
console.log("this is the ingredient page!");