var express = require('express');
var router = express.Router();
var test = require('../test');
var fs=require("fs");

/* GET ingredient page. */
router.get('/', function(req, res, next) {
    test.select_all_article('article', function(result1,result2){
        if(result1===0){
            var all = undefined;
        }
        else{
            var all = result2;
        }

        test.select_article_list('vegetables', 'ingredient', function (num, vegetableslist) {
            if (num === 0){
                var vegetables = undefined;
            } else {
                var vegetables = vegetableslist;
            }

            test.select_article_list('fruits', 'ingredient', function (num, fruitslist) {
                if (num === 0){
                    var fruits = undefined;
                } else {
                    var fruits = fruitslist;
                }

                        res.render('ingredientSec/ingredient', {
                            title: 'Exhibition',
                            name:'Daily Cate',
                            user: req.user,
                            allArticle: all,
                            vegetables: vegetables,
                            fruits:fruits
                        });
                    });
                });
            });
});




module.exports = router;
console.log("this is the ingredient page!");