//this file provides the needed functions for article deletion

//set up connection to local Database
var mysql = require("mysql");
var connection = mysql.createConnection({
    "host": "localhost",
    "port": 3306,
    "user": "root",
    "password": "123123",
    "database": "csci3100"
});

//delete all comments of an article given articleID
function delete_article_comment(arID,callback){
    var de_article_comment="delete from comments where articleID="+arID;
    connection.query(de_article_comment, function(error, results) {
        if (error) {
            return console.error(error);
        }
        return callback(true);
    });
}

//delete all likes of the article given articleID
function delete_followarticle(arID,callback){
    var de_followarticle="delete from followarticle where article="+arID;
    connection.query(de_followarticle, function(error, results) {
        if (error) {
            return console.error(error);
        }
        return callback(true);
    });
}

//delete an article with the given articleID
function delete_article(arID,callback){
    var de_article="delete from articles where articleID="+arID;
    connection.query(de_article, function(error, results) {
        if (error) {
            return console.error(error);
        }
        return callback(true);
    });
}

//select article information about an article given articleID
function select_article(arID,callback){
    var sel_article="select articlename,authorname,parastart,parano,picturestart,pictureno from articles where articleID="+arID;
    connection.query(sel_article, function(error, results) {
        if (error) {
            return console.error(error);
        }
        return callback(results[0]);
    });
}

//delete all pictures of this article
function delete_picture(id){
    var de_picture="delete from pictures where pictureID="+id;
    connection.query(de_picture, function(error, results) {
        if (error) {
            return console.error(error);
        }
        console.log(results);
    });
}

//delete all paragraphs of this article
function delete_paragraph(id){
    var de_paragraph="delete from paragraphs where paraID="+id;
    connection.query(de_paragraph, function(error, results) {
        if (error) {
            return console.error(error);
        }
        console.log(results);
    });
}
<<<<<<< HEAD

/*
var test = require('../delete_article');
test.select_article(1,function(article){
    console.log(article);
    var parastart=article.parastart;
    var parano=article.parano;
    console.log(parastart);
    console.log(parano);
    //var picturestart=article.picturestart;
    //var pictureno=article.pictureno;
    test.delete_article_comment(1,function(result1){
        if(result1==true){
            console.log("1: ",result1);
            test.delete_followarticle(1,function(result2){
                if(result2==true){
                    console.log("2: ",result2);
                    test.delete_article(1,function(result3){
                        if(result3==true){
                            console.log("3: ", result3);
                            for(var i=0;i<parano;i++){
                                var id=parano+i;
                                test.delete_paragraph(id);
                                test.delete_picture(id);
                            }

                        }
                    });
                }
            });
        }
    });

})*/
=======
>>>>>>> a8cf8e071502927eeaa7e96ffcb6f8b8582862da

//exports the functions
module.exports={
    connection:connection,
    delete_article:delete_article,
    select_article:select_article,
    delete_followarticle:delete_followarticle,
    delete_article_comment:delete_article_comment,
    delete_picture:delete_picture,
    delete_paragraph:delete_paragraph
};
