var express = require('express');
var router = express.Router();

var test = require('../test');
var fs=require("fs");

/* GET exhibition page. */
router.get('/', function(req, res, next) {
    test.select_all_article(function(result1,result2){
        if(result1===0){
            var all = undefined;
        }
        else{
            var all = result2;
        }
        test.select
        res.render('exhibitionSec/exhibition', {
            title: 'Exhibition',
            name:'Daily Cate',
            user: req.user,
            allArticle: all
        });
    });
});

module.exports = router;
console.log("this is the exhibition page!");