var express = require('express');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var router = express.Router();

var test = require('../test');
var connection = test.connection;
var fs=require("fs");

/* GET user search page. */
router.get('/', function(req, res) {
    test.search(req.query.searchname,function(results){
        if (results === undefined){
            //console.log(results);
            var results1= undefined;
        }
        else {
            //console.log(results);
            var results1 = results;
        }
        res.render('personalSec/search', {
            title: 'search',
            name: 'Daily Cate',
            user: req.user,
            results:results1
        });
    });
});

/* Handle POST requests: enter searched article; search */
router.post('/', function (req, res, next) {
    var result = req.body.results;

    if (result){
        //enter article page
        res.redirect('../exhibitionSec/articlePost?articleId=' + encodeURIComponent(result));
    }else {
        //search handling
        console.log(req.body.searchname);
        var searchname = encodeURIComponent(req.body.searchname);
        res.redirect('../personalSec/search?searchname=' + searchname);
    }
});

module.exports = router;