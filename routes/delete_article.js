var mysql = require("mysql");
var connection = mysql.createConnection({
    "host": "localhost",
    "port": 3306,
    "user": "root",
    "password": "123123",
    "database": "csci3100"
});

function delete_article_comment(arID,callback){
    var de_article_comment="delete from comments where articleID="+arID;
    connection.query(de_article_comment, function(error, results) {
        if (error) {
            return console.error(error);
        }
        return callback(true);
    });
}
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
function select_article(arID,callback){
    var sel_article="select articlename,authorname,parastart,parano,picturestart,pictureno from articles where articleID="+arID;
    connection.query(sel_article, function(error, results) {
        if (error) {
            return console.error(error);
        }
        return callback(results[0]);
    });

    //return all the picture and paragraph files stored before for this article
    //for loop to open the files
    //how to get the variables parastart, parano,picstart,picno
    //return all pictures, paragrahs and comments of this article
}
function delete_picture(id){
    var de_picture="delete from pictures where pictureID="+id;
    connection.query(de_picture, function(error, results) {
        if (error) {
            return console.error(error);
        }
        console.log(results);
    });
}
function delete_paragraph(id){
    var de_paragraph="delete from paragraphs where paraID="+id;
    connection.query(de_paragraph, function(error, results) {
        if (error) {
            return console.error(error);
        }
        console.log(results);
    });
}

module.exports={
    connection:connection,
    delete_article:delete_article,
    select_article:select_article,
    delete_followarticle:delete_followarticle,
    delete_article_comment:delete_article_comment,
    delete_picture:delete_picture,
    delete_paragraph:delete_paragraph
};
