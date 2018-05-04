var express = require('express');
var router = express.Router();
var multer = require('multer');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'routes/exhibitionSec/pictures/');
    },
    filename: function (req, file, cb) {
        var files = req.files.length;
        test.count_picture_no(function (result){
            cb(null,String(files + result));
        });
    }
});
var upload = multer({ storage: storage });
var fs = require("fs");
var aio = require('array-indexof-object');

var test = require('../test');

/* GET posting new article page. */
router.get('/', function(req, res, next) {
    res.render('exhibitionSec/exhposting', {
        title: 'Posting',
        name:'Daily Cate',
        user: req.user
    });
});

/* Handle POST requests */
router.post('/', upload.any('picture'), function (req,res,next) {
    var text = (typeof (req.body.text) === "string") ? [req.body.text]: req.body.text;
    var picture = req.files;
    var title = req.body.title;
    var tag = req.body.tag;
    var type = req.body.type;

    if (text && picture && title && tag && type) {
        test.count_paragraph_no(function (parastart) {
            //save paragraphs
            for (var j = 0; j < text.length; j++) {
                console.log(text[j]);
                fs.writeFile("routes/exhibitionSec/texts/" + (parastart + j + 1) + '.txt', text[j], function (error) {
                    if (error) {
                        console.log(error);
                    }
                });
            }
            //insert information to db
            test.count_picture_no(function (picstart) {
                test.count_article_no(function (result) {
                    console.log('arti: ', result + 1, 'title: ', title, 'username: ', req.user.username, 'tag:', tag, 'picnum: ', picture.length, 'picstart: ', picstart + 1, 'textnum: ', text.length, 'parastart: ', parastart + 1)
                    test.insert_article(result + 1, title, req.user.username, tag, (new Date()).toLocaleDateString(), picture.length, picstart + 1, text.length, parastart + 1, type);

                    if (type === 'article') {
                        res.redirect('./exhibition');
                    }
                    else if (type === 'help') {
                        res.redirect('../askingSec/asking');
                    }
                });
            });
        });
    }else{
        //search handling
        console.log(req.body.searchname);
        var searchname = encodeURIComponent(req.body.searchname);
        res.redirect('../personalSec/search?searchname=' + searchname);
    }

});

module.exports = router;