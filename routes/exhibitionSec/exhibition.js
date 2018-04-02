var express = require('express');
var router = express.Router();

var test = require('../test');
var fs=require("fs");

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
            var textpath = [];
            var text = [];
            for(var i=0;i<result1;i++){
                textpath.push(result2[i].parastart+result2[i].parano-1);
                textpath[i]='./routes/exhibitionSec/texts/'+textpath[i];
                var data=fs.readFileSync(textpath[i]);
                text.push(data.toString());
            }
            res.render('exhibitionSec/exhibition', {
                title: 'Exhibition',
                name:'Daily Cate',
                user: req.user,
                allArticle: result2,
                articleNum: result2.length,
                text: text
            });
        }
    });
});

module.exports = router;
console.log("this is the exhibition page!");