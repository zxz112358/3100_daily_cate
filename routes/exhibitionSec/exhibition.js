var express = require('express');
var router = express.Router();

var test = require('../test');

/* GET exhibition page. */
router.get('/', function(req, res, next) {
    test.select_all_article(function(result1,result2){
        if(result1===0){
            console.log("no results found.");
            res.render('exhibitionSec/exhibition', {
                title: 'Exhibition',
                name:'Daily Cate',
                user: req.user,
                allArticle: undefined
            });
        }
        else{
            console.log(result2);
            console.log(result1);
            console.log(result2[0].articlename);
            res.render('exhibitionSec/exhibition', {
                title: 'Exhibition',
                name:'Daily Cate',
                user: req.user,
                allArticle: result2,
                articleNum: result2.length
            });
        }
    });
});

module.exports = router;
console.log("this is the exhibition page!");