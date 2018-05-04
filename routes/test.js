/*The .js file set up connection to database-Mysql and several functions based on different 
mysql statement such as insert, delete, update, select etc for the use of front end when users
have different requests.*/

//set up connection to local databse
var mysql = require("mysql");
var connection = mysql.createConnection({
    "host": "localhost",
    "port": 3306,
    "user": "root",
    "password": "123123",
    "database": "csci3100"
});


//insert new client records into database
function insert_client(name,email,pwd,desc){
    var in_client = "insert into client values ("+'\''+name.replace(/'/,"\\\'")+'\''+","+'\''+email.replace(/'/,"\\\'")+'\''+","+'\''+pwd.replace(/'/,"\\\'")+'\''+","+'\''+desc.replace(/'/,"\\\'")+'\''+")";
    connection.query(in_client, function(error) {
        if (error) {
            return console.error(error);
        }
    });
}


//update clients' personal information
function update_client(name,email,pwd,desc,callback){
    var up_client = "update client set email="+'\''+email.replace(/'/,"\\\'")+'\''+",password="+'\''+pwd.replace(/'/,"\\\'")+'\''+",description="+'\''+desc.replace(/'/,"\\\'")+'\''+"where username="+'\''+name.replace(/'/,"\\\'")+'\'';
    connection.query(up_client, function(error, results) {
        if (error) {
            return callback(false);
        }
        else{
            return callback(true);
        }
    });
}

//insert new article records into database
function insert_article(arID,arname,auname,tag,posttime,picNo,picstart,paraNo,parastart,type){
    //pictures for this article will be stored before and pass the startID and picture numbers
    for(var i=0;i<picNo;i++){
        var index=picstart+i;
        var in_picture = "insert into pictures values ("+index+")";
        connection.query(in_picture, function(error, results) {
            if (error) {
                return console.error(error);
            }
            //console.log(results);
        });
    }
    //paragraphs for this article will be stored before and pass the startID and paragraph numbers
    for(var i=0;i<paraNo;i++){
        var index=parastart+i;
        var in_paragraph = "insert into paragraphs values ("+index+")";
        connection.query(in_paragraph, function(error, results) {
            if (error) {
                return console.error(error);
            }
            console.log(results);
        });
    }
    //insert new article to the database
    var in_article = "insert into articles values ("+arID+","+'\''+arname.replace(/'/,"\\\'")+'\''+","+'\''+auname.replace(/'/,"\\\'")+'\''+","+'\''+tag+'\''+","+'\''+posttime+'\''+","+picNo+","+picstart+","+paraNo+","+parastart+","+'\''+type+'\''+")";
    connection.query(in_article, function(error, results) {
        if (error) {
            return console.error(error);
        }
        console.log(results);
    });
}



//insert a new comment
function insert_comment(coID,auname,content,arID){
    var in_comment = "insert into comments values ("+coID+","+'\''+auname.replace(/'/,"\\\'")+'\''+","+'\''+content.replace(/'/,"\\\'")+'\''+","+arID+")";
    connection.query(in_comment, function(error, results) {
        if (error) {
            return console.error(error);
        }
        console.log(results);
    });
}

//delete a comment with the given commentID
function delete_comment(coID){
    var de_comment="delete from comments where commentID="+coID;
    connection.query(de_comment, function(error, results) {
        if (error) {
            return console.error(error);
        }
        console.log(results);
    });
}


//select a particular article given articleID
function select_article(arID,callback){
    var sel_article="select articlename,authorname,parastart,parano,picturestart,pictureno from articles where articleID="+arID;
    connection.query(sel_article, function(error, results) {
        if (error) {
            return console.error(error);
        }
        return callback(results[0]);
    });
}

//select all comments of a particular article given the articleID
function select_article_comment(arID,callback){
    var sel_article_comment="select * from comments where articleID="+arID;
    connection.query(sel_article_comment, function(error, results) {
        if (error) {
            return console.error(error);
        }
        return callback(Object.keys(results).length,results);

    });
}

//count the number of comment of a particular article given the articleID
function count_comment_no(arID,callback){
    var co_comment_no="select distinct count(*) as count from comments where articleID="+arID+" group by articleID";
    connection.query(co_comment_no, function(error, results) {
        if (error) {
            return console.error(error);
        }
        Object.keys(results).forEach(function(key){
            var row=results[key];
            return callback(row);

        });
    });
}

//select all articles of a client given the username
function select_all_client_article(name,callback){
    var sel_client_article="select * from articles where authorname="+'\''+name.replace(/'/,"\\\'")+'\'';
    connection.query(sel_client_article, function(error, results) {
        if (error) {
            return console.error(error);
        }
        return callback(Object.keys(results).length,results);
    });
}

//select all articles of a type of a client given the username and type
function select_client_article(name,type,callback){
    var sel_client_article="select * from articles where authorname="+'\''+name.replace(/'/,"\\\'")+'\''+"and type =" +'\''+type+'\'';
    connection.query(sel_client_article, function(error, results) {
        if (error) {
            return console.error(error);
        }
        return callback(Object.keys(results).length,results);
    });
}

//select all comments of a client given username
function select_client_comment(name,callback){
    var sel_client_comment="select c.commentID, c.authorname as commentname, c.content, c.articleID,a.articlename, a.authorname,a.tag,a.posttime,a.pictureno,a.picturestart,a.parano,a.parastart   from comments c, articles a where c.authorname="+'\''+name.replace(/'/,"\\\'")+'\''+" and c.articleID=a.articleID";
    connection.query(sel_client_comment, function(error, results) {
        if (error) {
            return console.error(error);
        }
        return callback(Object.keys(results).length,results);
    });
}

//select all articles of a type and a tag given type and tag
function select_article_list(tag,type,callback){
    var sel_article_list="select * from articles where tag="+'\''+tag+'\''+"and type = "+ '\''+type+'\'';
    connection.query(sel_article_list, function(error, results) {
        if (error) {
            return console.error(error);
        }
        return callback(Object.keys(results).length,results);
    });

}

//select all articles of a type given type
function select_all_article(type,callback){
    var sel_all_article="select * from articles where type = "+'\''+type+'\'';
    connection.query(sel_all_article, function(error, results) {
        if (error) {
            return console.error(error);
        }
        return callback(Object.keys(results).length,results);
    });
    //return the list of articles with articlenames and authornames

}

//select user information of a user given username
function select_user(name,callback){
    var sel_username="select username,email,password,description from client where username="+'\''+name.replace(/'/,"\\\'")+'\'';
    connection.query(sel_username, function(error, results) {
        if (error) {
            return console.error(error);
        }
        if(Object.keys(results).length===0){
            return callback(false);
        }
        //console.log(results.username);
        return callback(results[0]);

    });
}

//user1 follow user2
function follow(user1,user2) {
    //user1.replace(/'/,"\'");
    //user2.replace(/'/,"\'");
    var fo = "insert into follow(user1,user2) values ("+'\''+user1.replace(/'/,"\\\'")+'\''+',\''+user2.replace(/'/,"\\\'")+'\')';
    connection.query(fo,function (error,results) {
        if (error){
            return console.error(error);
        }
        console.log(results);
    });
}

//user like an article given username and articleID
function like_article(articleid,user) {
    //user.replace(/'/,"\'");
    var li_article = "insert into followarticle(article,user) values ("+articleid+',\''+user.replace(/'/,"\\\'")+'\')';
    connection.query(li_article,function (error,results) {
        if (error){
            return console.error(error);
        }
        console.log(results);
    });
}

//count the number of people who follow user2, given user2
function check_followers(name, callback) {
    //name.replace(/'/,"\'");
    var ch_followers = "select count(user2) as count from follow where user2 = "+'\''+name.replace(/'/,"\\\'")+'\'';
    connection.query(ch_followers,function (error, results) {
        if (error){
            return console.error(error);
        }
        return callback(results[0]);
    });
}

//select user2's followers given user2
function select_my_followers(name,callback){
    //name.replace(/'/,"\'");
    var se_my_followers= "select * from follow f, client c where f.user2= "+'\''+name.replace(/'/,"\\\'")+'\''+" and f.user1=c.username";
    connection.query(se_my_followers,function (error, results) {
        if (error){
            return console.error(error);
        }
        return callback(Object.keys(results).length,results);
    });
}

//select user1's followings given user1
function select_my_followings(name, callback) {
    //name.replace(/'/,"\'");
    var se_my_followings= "select * from follow f, client c where f.user1= "+'\''+name.replace(/'/,"\\\'")+'\''+" and f.user2=c.username";
    connection.query(se_my_followings,function (error, results) {
        if (error){
            return console.error(error);
        }
        return callback(Object.keys(results).length,results);
    });
}

//count the number of people user1 is following
function check_my_follow(name, callback) {
    var ch_my_follow = "select count(user1) as count from follow where user1 ="+'\''+name.replace(/'/,"\\\'")+'\'';
    connection.query(ch_my_follow,function (error, results) {
        if (error){
            return console.error(error);
        }
        return callback(results[0]);
    });
}

//count the number of likes an article received given articleID
function article_like(articleid,callback) {
    var ar_like = "select count(article) as count from followarticle where article ="+articleid;
    connection.query(ar_like,function (error, results) {
        if (error){
            return console.error(error);
        }
        return callback(results[0]);
    });
}

//select all articles a client like given username
function select_article_like(username,callback) {
    var se_article_like = "select * from followarticle f, articles a where f.user ="+'\''+username.replace(/'/,"\\\'")+'\''+" and f.article=a.articleid";
    connection.query(se_article_like, function(error, results) {
        if (error) {
            return console.error(error);
        }
        return callback(Object.keys(results).length,results);
    });
}

//search function given search name
function search(name,callback){
    var an="select * from articles where authorname like "+'\''+"%"+name.replace(/'/,"\\\'")+"%"+'\''+"or articlename like"+'\''+"%"+name.replace(/'/,"\\\'")+"%"+'\'';
    connection.query(an, function(error, results) {
        if (error) {
            return console.error(error);
        }
        else {
            return callback(results);
        }
    });
}


//select the articleid with kth largest number of likes
function select_k(callback){
    var se_nok="select distinct f.article, count(user) as count, a.articleID, a.type,a.articlename,a.authorname,a.tag,a.posttime,a.picturestart,a.pictureno,a.parastart,a.parano from followarticle f, articles a where a.articleID=f.article group by f.article order by count desc";
    connection.query(se_nok, function(error, results) {
        if (error) {
            return console.error(error);
        }
        if(Object.keys(results).length===0){
            return callback(false);
        }
        return callback(results);

    });
}

//user1 unfollow user2 given user1 and user2
function unfollow(user1,user2) {
    var unfo = "delete from follow where user1="+'\''+user1+'\''+" and user2 ="+'\''+user2+'\'';
    connection.query(unfo,function (error,results) {
        if (error){
            return console.error(error);
        }
        console.log(results);
    });
}

//user unlike the article given username and articleID
function unlike(username,articleid) {
    var unfo = "delete from followarticle where user="+'\''+username+'\''+" and article ="+articleid;
    connection.query(unfo,function (error,results) {
        if (error){
            return console.error(error);
        }
        console.log(results);
    });
}

//select article and comments of an article given articleID
function select_article_and_comment(arID,callback){
    var sel_article_and_comment="select * from comments c, articles a where c.articleID="+arID+" and a.articleID="+arID;
    connection.query(sel_article_and_comment, function(error, results) {
        if (error) {
            return console.error(error);
        }
        return callback(Object.keys(results).length,results);
    });
}

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

//delete the likes of an article given articleID
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

//count the number of articles
function count_article_no(callback){
    var count_article="select * from articles";
    connection.query(count_article, function(error, results) {
        if (error) {
            return console.error(error);
        }
        var index=Object.keys(results).length;
        if(index==0){
            return callback(0);
        }
        else{
            return callback(results[index-1].articleID);
        }

    });

}

//count the number of total paragraphs of all articles
function count_paragraph_no(callback){
    var count_paragraph="select * from paragraphs";
    connection.query(count_paragraph, function(error, results) {
        if (error) {
            return console.error(error);
        }
        var index=Object.keys(results).length;
        if(index==0){
            return callback(0);
        }
        else{
            return callback(results[index-1].paraID);
        }

    });

}

//count the number of total pictures of all articles
function count_picture_no(callback){
    var count_picture="select * from pictures";
    connection.query(count_picture, function(error, results) {
        if (error) {
            return console.error(error);
        }
        var index=Object.keys(results).length;
        if(index==0){
            return callback(0);
        }
        else{
            return callback(results[index-1].pictureID);
        }

    });

}

//count the number of total comments of all articles
function count_comment(callback){
    var co_comment_no="select * from comments";
    connection.query(co_comment_no, function(error, results) {
        if (error) {
            return console.error(error);
        }
        var index=Object.keys(results).length;
        if(index==0){
            return callback(0);
        }
        else{
            return callback(results[index-1].commentID);
        }
    });
}

//check whether a client like the article given the username and articleID
function check_whether_like_article(username,arid,callback) {
    var che_whether_like_article = "select * from followarticle where user ="+'\''+username.replace(/'/,"\\\'")+'\''+" and article="+arid;
    connection.query(che_whether_like_article, function(error, results) {
        if (error) {
            return console.error(error);
        }
        if (Object.keys(results).length==0){
            return callback(false);
        }
        return callback(true);
    });

}

//check whether user1 follow user2 given user1 and user2
function check_whether_follow(user1,user2,callback) {
    var che_whether_follow = "select * from follow where user1 ="+'\''+user1+'\''+" and user2="+'\''+user2.replace(/'/,"\\\'")+'\'';
    connection.query(che_whether_follow, function(error, results) {
        if (error) {
            return console.error(error);
        }
        //console.log(results);
        if (Object.keys(results).length==0){
            return callback(false);
        }
        return callback(true);
    });

}

//exports the functions
module.exports={
    connection:connection,
    insert_client:insert_client,
    update_client:update_client,
    insert_article:insert_article,
    delete_article:delete_article,
    insert_comment:insert_comment,
    delete_comment:delete_comment,
    select_article:select_article,
    select_article_list:select_article_list,
    select_user: select_user,
    select_client_article:select_client_article,
    select_all_client_article:select_all_client_article,
    select_client_comment:select_client_comment,
    follow:follow,
    search:search,
    select_k:select_k,
    select_my_followings:select_my_followings,
    select_my_followers:select_my_followers,
    select_article_comment:select_article_comment,
    count_comment_no:count_comment_no,
    count_article_no:count_article_no,
    count_paragraph_no:count_paragraph_no,
    count_picture_no:count_picture_no,
    select_article_like:select_article_like,
    select_all_article:select_all_article,
    unfollow:unfollow,
    unlike:unlike,
    select_article_and_comment:select_article_and_comment,
    count_comment:count_comment,
    delete_followarticle:delete_followarticle,
    delete_article_comment:delete_article_comment,
    like_article:like_article,
    check_followers:check_followers,
    check_my_follow:check_my_follow,
    check_whether_like_article:check_whether_like_article,
    check_whether_follow:check_whether_follow

};
