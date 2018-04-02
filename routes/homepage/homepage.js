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

module.exports = router;
console.log("this is the home page!");