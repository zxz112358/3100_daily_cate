var express = require('express');
var router = express.Router();
var fs=require("fs");

var test = require('../test');
var connection = test.connection;
/* GET home page. */
router.get('/', function(req, res, next) {
    test.select_k(function(result){
        var k_articles=[];
        var string1=[];


        for(var i=0;i<5;i++){
            console.log(result[i]);
            string1.push(result[i].picturestart+result[i].pictureno-1);
            string1[i]='../exhibitionSec/pictures/'+string1[i];
            k_articles.push(result[i]);
        }
        res.render('homepage/homepage', {
            title: 'Daily Cate',
            name:'Daily Cate',
            user: req.user,
            articles:k_articles,
            coverpic:string1
        });

        console.log(k_articles);
    });
});

router.post('/', function (req, res, next) {
    var result = String(req.body.result).match(/[^\d]+|\d+/g);
    console.log('result: ', result);
    console.log(req.body.searchname);

    if (result[0] !== '' && result[0] !== 'undefined') {
        console.log('click result not null')
        new Promise(
            function (resolve, reject) {
                test.select_k(function (articleList) {
                    console.log(articleList);
                    console.log('articleID: ', articleList[result[0]].articleID);
                    console.log(encodeURIComponent(articleList[result[0]].articleID));
                    resolve(articleList[result[0]]);
                });
            }
        ).then(function (article) {
            var type = article.type;
            var id = article.articleID;
            console.log(type, ',', id);
            if (type === 'article') {
                res.redirect('../exhibitionSec/articlePost?articleId=' + id);
            } else if (type === 'help') {
                res.redirect('../askingSec/helpPost?articleId=' + id);
            } else if (type === 'ingredient') {
                //TO DO: ingredient post page
                res.send('ingredient post page is not completed yet.');
            }
        });
    }else{
        //search handling
        console.log(req.body.searchname);
        var searchname = encodeURIComponent(req.body.searchname);
        res.redirect('../personalSec/search?searchname=' + searchname);
    }
});

module.exports = router;
console.log("this is the home page!");