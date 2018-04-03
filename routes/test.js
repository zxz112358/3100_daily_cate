/*The .js file set up connection to database-Mysql and several functions based on different 
mysql statement such as insert, delete, update, select etc for the use of front end when users
have different requests.*/

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



function update_client(name,email,pwd,desc,callback){
    //name.replace(/'/,'\'');
    //email.replace(/'/,'\'');
    //pwd.replace(/'/,'\'');
    //desc.replace(/'/,'\'');
    var up_client = "update client set email="+'\''+email.replace(/'/,"\\\'")+'\''+",password="+'\''+pwd.replace(/'/,"\\\'")+'\''+",description="+'\''+desc.replace(/'/,"\\\'")+'\''+"where username="+'\''+name.replace(/'/,"\\\'")+'\'';
    connection.query(up_client, function(error, results) {
        if (error) {
            return callback(false);
        }
        else{
            return callback(true);
        }
        //console.log(results);
    });
}
/*test.update_client('1','11@gmail.com','1','I like eating',function(result){
    if(result==true){
        console.log(result);
    }
});*/

//insert new article records into database
function insert_article(arID,arname,auname,tag,posttime,picNo,picstart,paraNo,parastart,type){
    //pictures for this article will be stored before and pass the startID and picture numbers
    //arname.replace(/'/,'\'');
    //auname.replace(/'/,'\'');
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
    //return T or F
}



//insert a new comment
function insert_comment(coID,auname,content,arID){
    //auname.replace(/'/,'\'');
    //content.replace(/'/,'\'');
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
    //return T or F
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
/*test.select_article(1,function(result){
    console.log(result.articlename);
});*/


function select_article_comment(arID,callback){
    var sel_article_comment="select * from comments where articleID="+arID;
    connection.query(sel_article_comment, function(error, results) {
        if (error) {
            return console.error(error);
        }
        //console.log(results);
        return callback(Object.keys(results).length,results);

    });
}
/*test.select_article_comment(<articleid>,function(result1,result2){
    console.log(result1);//the no. of comments in that article;
    console.log(result2);//all comments -> result2[i].content
});*/


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
/*test.count_comment_no(<articleID>,function(result){
    console.log(result.count);
});
*/
function select_all_client_article(name,callback){
    //name.replace(/'/,"\'");
    var sel_client_article="select * from articles where authorname="+'\''+name.replace(/'/,"\\\'")+'\'';
    connection.query(sel_client_article, function(error, results) {
        if (error) {
            return console.error(error);
        }
        return callback(Object.keys(results).length,results);
    });
}

function select_client_article(name,type,callback){
    //name.replace(/'/,"\'");
    var sel_client_article="select * from articles where authorname="+'\''+name.replace(/'/,"\\\'")+'\''+"and type =" +'\''+type+'\'';
    connection.query(sel_client_article, function(error, results) {
        if (error) {
            return console.error(error);
        }
        return callback(Object.keys(results).length,results);
        /*Object.keys(results).forEach(function(key){
            var row=results[key];
            return callback(row);

        });*/
    });
}
function select_client_comment(name,callback){
    //name.replace(/'/,"\'");
    var sel_client_comment="select c.commentID, c.authorname as commentname, c.content, c.articleID,a.articlename, a.authorname,a.tag,a.posttime,a.pictureno,a.picturestart,a.parano,a.parastart   from comments c, articles a where c.authorname="+'\''+name.replace(/'/,"\\\'")+'\''+" and c.articleID=a.articleID";
    connection.query(sel_client_comment, function(error, results) {
        if (error) {
            return console.error(error);
        }
        //console.log(results);
        return callback(Object.keys(results).length,results);
    });
}
/*test.select_client_article('1',function(result1,result2){
    if(result1==0){
        console.log("you do not have article");
    }
    else{
        var string=[];
        for(var i=0;i<result1;i++){
            string.push(result2[i].picturestart+result2[i].pictureno-1);
        }
        for(var i=0,i<result1,i++){
            string[i]=string[i]
        }
        console.log(result2);
        console.log(string);
    }
});*/
/*test.select_client_comment(<username>,function(result1,result2){
    if(result1==0){
        console.log("you do not have any comment");
    }
    else{
        console.log(result2);
    }
});*/

//select a list of article names based on the given tag for user to choose
function select_article_list(tag,type,callback){
    var sel_article_list="select * from articles where tag="+'\''+tag+'\''+"and type = "+ '\''+type+'\'';
    connection.query(sel_article_list, function(error, results) {
        if (error) {
            return console.error(error);
        }
        return callback(Object.keys(results).length,results);
    });
    //return the list of articles with articlenames and authornames

}
/*test.select_article_list(<tag_name>,function(result1,result2){
    if(result1==0){
        console.log("no results found.");
    }
    else{
        console.log(result2);
    }

});*/


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

/*test.select_all_article(function(result1,result2){
    if(result1==0){
        console.log("no results found.");
    }
    else{
        console.log(result2);
    }

});*/
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

/*test.select_user('i',function(user){

    if (user==false){
        console.log("no such person");
    }
    else{
        console.log(user.description);

    }

});*/


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
/*
test.check_followers(<username>,function(result){
        console.log(result.count);//how many people follow person <username>

});*/


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
/*test.select_my_followers(<username>,function(result1,result2){
    //print the table includes all user2
    if(result1==0){
        console.log("no followers");
    }
    else{
        console.log(result2);
    }

});*/


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
/*test.select_my_followers(<username>,function(result1,result2){
    //print the table includes all user2
    if(result1==0){
        console.log("no followings");
    }
    else{
        console.log(result2);
    }

});*/


function check_my_follow(name, callback) {
    //name.replace(/'/,"\'");
    var ch_my_follow = "select count(user1) as count from follow where user1 ="+'\''+name.replace(/'/,"\\\'")+'\'';
    connection.query(ch_my_follow,function (error, results) {
        if (error){
            return console.error(error);
        }
        return callback(results[0]);
    });
}

function article_like(articleid,callback) {
    var ar_like = "select count(article) as count from followarticle where article ="+articleid;
    connection.query(ar_like,function (error, results) {
        if (error){
            return console.error(error);
        }
        return callback(results[0]);
    });
}

function select_article_like(username,callback) {
    //name.replace(/'/,"\'");
    var se_article_like = "select * from followarticle f, articles a where f.user ="+'\''+username.replace(/'/,"\\\'")+'\''+" and f.article=a.articleid";
    connection.query(se_article_like, function(error, results) {
        if (error) {
            return console.error(error);
        }
        /*if (Object.keys(results).length === 0) {
            return callback(null);
        }*/
        return callback(Object.keys(results).length,results);
    });
}
/*test.select_article_like('1',function(result1,result2){
    //print the table includes all user2
    if(result1==0){
        console.log("no like articles");
    }
    else{
        console.log(result2);
    }

});*/

function search(name,callback){
    //name.replace(/'/,"\'");
    var an="select articlename, authorname from articles where authorname like "+'\''+"%"+name.replace(/'/,"\\\'")+"%"+'\''+"or articlename like"+'\''+"%"+name.replace(/'/,"\\\'")+"%"+'\'';
    connection.query(an, function(error, results) {
        if (error) {
            return console.error(error);
        }
        if(Object.keys(results).length===0){
            return callback(false);
        }
        Object.keys(results).forEach(function(key){
            var row=results[key];
            return callback(row);

        });
    });
    //return T or F
}
/*test.search(<search_key>,function(result){
    if(result==false){
    	console.log("no result found");
    }
    else{
        console.log(result.articlename);
        console.log(result.authorname);
    }

});*/




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
/*test.select_k(function(result){
    var k_articles=[];
    //console.log(result);
    for(var i=0;i<5;i++){
        k_articles.push(result[i]);
    }
    console.log(k_articles);
});*/
function unfollow(user1,user2) {
    var unfo = "delete from follow where user1="+'\''+user1+'\''+" and user2 ="+'\''+user2+'\'';
    connection.query(unfo,function (error,results) {
        if (error){
            return console.error(error);
        }
        console.log(results);
    });
}
function select_article_and_comment(arID,callback){
    var sel_article_and_comment="select * from comments c, articles a where c.articleID="+arID+" and a.articleID="+arID;
    connection.query(sel_article_and_comment, function(error, results) {
        if (error) {
            return console.error(error);
        }
        return callback(Object.keys(results).length,results);
        /*Object.keys(results).forEach(function(key){
            var row=results[key];
            return callback(row);

        });*/
    });
}


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
function count_article_no(callback){
    var count_article="select * from articles";
    connection.query(count_article, function(error, results) {
        if (error) {
            return console.error(error);
        }
        return callback(Object.keys(results).length,results);
    });

}
function count_paragraph_no(callback){
    var count_paragraph="select * from paragraphs";
    connection.query(count_paragraph, function(error, results) {
        if (error) {
            return console.error(error);
        }
        return callback(Object.keys(results).length,results);

    });

}
function count_picture_no(callback){
    var count_picture="select * from pictures";
    connection.query(count_picture, function(error, results) {
        if (error) {
            return console.error(error);
        }
        return callback(Object.keys(results).length,results);

    });

}
function count_comment(callback){
    var co_comment_no="select * from comments";
    connection.query(co_comment_no, function(error, results) {
        if (error) {
            return console.error(error);
        }
        return callback(Object.keys(results).length,results);

    });
}

/*test.count_article_no(function(length,array){
    console.log(length);
    if(length==0){
        console.log(0);
    }
    else{
        console.log(array[length-1].articleID);
    }

});
test.count_picture_no(function(length,array){
    console.log(length);
    if(length==0){
        console.log(0);
    }
    else{
        console.log(array[length-1].pictureID);
    }

});
test.count_paragraph_no(function(length,array){
    console.log(length);
    if(length==0){
        console.log(0);
    }
    else{
        console.log(array[length-1].paraID);
    }

});
test.count_comment(function(length,array){
    console.log(length);
    if(length==0){
        console.log(0);
    }
    else{
        console.log(array[length-1].commentID);
    }

});*/
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
    select_article_and_comment:select_article_and_comment,
    count_comment:count_comment,
    delete_followarticle:delete_followarticle,
    delete_article_comment:delete_article_comment
};
