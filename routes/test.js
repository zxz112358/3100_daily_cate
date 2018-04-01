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
    var in_client = "insert into client values ("+'\''+name+'\''+","+'\''+email+'\''+","+'\''+pwd+'\''+","+'\''+desc+'\''+")";
    connection.query(in_client, function(error, results) {
        if (error) {
            return console.error(error);
        }
        //console.log(results);
    });
}



function update_client(name,email,pwd,desc){
    var up_client = "update client set email="+'\''+email+'\''+",password="+'\''+pwd+'\''+",description="+'\''+desc+'\''+"where username="+'\''+name+'\'';
    connection.query(up_client, function(error, results) {
        if (error) {
            return console.error(error);
        }
        //console.log(results);
    });
}
function count_article_no(callback){
    var count_article="select count(articleID) as count from articles";
    connection.query(count_article, function(error, results) {
        if (error) {
            return console.error(error);
        }
        Object.keys(results).forEach(function(key){
            var row=results[key];
            return callback(row.count);

        });
    });

}
function count_paragraph_no(callback){
    var count_paragraph="select count(*) as count from paragraphs";
    connection.query(count_paragraph, function(error, results) {
        if (error) {
            return console.error(error);
        }
        //console.log(results.count);
        Object.keys(results).forEach(function(key){
            var row=results[key];
            return callback(row.count);

        });
    });

}
function count_picture_no(callback){
    var count_picture="select count(pictureID) as count from pictures";
    connection.query(count_picture, function(error, results) {
        if (error) {
            return console.error(error);
        }
        Object.keys(results).forEach(function(key){
            var row=results[key];
            return callback(row.count);

        });
    });

}
/*test.count_article_no(function(result){
    console.log(result);
});
test.count_paragraph_no(function(result){
    console.log(result);
});
test.count_picture_no(function(result){
    console.log(result);
});*/



//insert new article records into database
function insert_article(arID,arname,auname,tag,posttime,picNo,picstart,paraNo,parastart){
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
    var in_article = "insert into articles values ("+arID+","+'\''+arname+'\''+","+'\''+auname+'\''+","+'\''+tag+'\''+","+'\''+posttime+'\''+","+picNo+","+picstart+","+paraNo+","+parastart+")";
    connection.query(in_article, function(error, results) {
        if (error) {
            return console.error(error);
        }
        console.log(results);
    });
    //return T or F
}

//delete an article with the given articleID
function delete_article(arID){
    var de_article="delete from articles where articleID="+arID;
    connection.query(de_article, function(error, results) {
        if (error) {
            return console.error(error);
        }
        console.log(results);
    });
}

//insert a new comment
function insert_comment(coID,auname,content,arID){
    var in_comment = "insert into comments values ("+coID+","+'\''+auname+'\''+","+'\''+content+'\''+","+arID+")";
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
function select_article(arID){
    var sel_article="select articlename,authorname,parastart,parano,picturestart,pictureno from articles where articleID="+arID;
    connection.query(sel_article, function(error, results) {
        if (error) {
            return console.error(error);
        }
        console.log(results);
    });

    //return all the picture and paragraph files stored before for this article
    //for loop to open the files
    //how to get the variables parastart, parano,picstart,picno
    //return all pictures, paragrahs and comments of this article
}

function select_article_comment(arID,callback){
    var sel_article_comment="select * from comments where articleID="+arID;
    connection.query(sel_article_comment, function(error, results) {
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

function select_client_article(name,callback){
    var sel_client_article="select * from articles where authorname="+'\''+name+'\'';
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
    var sel_client_comment="select c.commentID, c.authorname as commentname, c.content, c.articleID,a.articlename, a.authorname,a.tag,a.posttime,a.pictureno,a.picturestart,a.parano,a.parastart   from comments c, articles a where c.authorname="+'\''+name+'\''+" and c.articleID=a.articleID";    connection.query(sel_client_comment, function(error, results) {
        if (error) {
            return console.error(error);
        }
        //console.log(results);
        return callback(Object.keys(results).length,results);
    });
}
/*test.select_client_article('1',function(result1,result2){
    if(result1==0){
        console.log("you do not have any article");
    }
    else{
        console.log(result2);
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
function select_article_list(tag){
    var sel_article_list="select articlename,authorname from articles where tag="+'\''+tag+'\'';
    connection.query(sel_article_list, function(error, results) {
        if (error) {
            return console.error(error);
        }
        console.log(results);
    });
    //return the list of articles with articlenames and authornames

}

function select_user(name,callback){
    var sel_username="select username,email,password,description from client where username="+'\''+name+'\'';
    connection.query(sel_username, function(error, results) {
        if (error) {
            return console.error(error);
        }
        if(Object.keys(results).length===0){
            return callback(false);
        }
        //console.log(results.username);
        Object.keys(results).forEach(function(key){
            var row=results[key];
            return callback(row);

        });
    });
}


function follow(user1,user2) {
    var fo = "insert into follow(user1,user2) values ("+'\''+user1+'\''+',\''+user2+'\')';
    connection.query(fo,function (error,results) {
        if (error){
            return console.error(error);
        }
        console.log(results);
    });
}

function like_article(articleid,user) {
    var li_article = "insert into followarticle(article,user) values ("+articleid+',\''+user+'\')';
    connection.query(li_article,function (error,results) {
        if (error){
            return console.error(error);
        }
        console.log(results);
    });
}
function check_followers(name, callback) {
    var ch_followers = "select count(user2) as count from follow where user2 = "+'\''+name+'\'';
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


function select_my_followees(name,callback){
    var se_my_followees= "select user1 from follow where user2= "+'\''+name+'\'';
    connection.query(se_my_followees,function (error, results) {
        if (error){
            return console.error(error);
        }
        return callback(Object.keys(results).length,results);
    });
}
/*test.select_my_followees(<name_of_user2>,function(result1,result2){
    //print the table includes all user2
    if(result1==0){
        console.log("no followees");
    }
    else{
        console.log(result2[0].user1);
    }

});*/


function select_my_followers(name, callback) {
    var se_my_followers = "select user2 from follow where user1 ="+'\''+name+'\'';
    connection.query(se_my_followers,function (error, results) {
        if (error){
            return console.error(error);
        }
        return callback(Object.keys(results).length,results);
    });
}
/*test.select_my_followers(<name_of_user1>,function(result1,result2){
    //print the table includes all user2
    if(result1==0){
        console.log("no followers");
    }
    else{
        console.log(result2[0].user2);
    }

});*/


function check_my_follow(name, callback) {
    var ch_my_follow = "select count(user1) as count from follow where user1 ="+'\''+name+'\'';
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




function search(name,callback){
    var an="select articlename, authorname from articles where authorname like "+'\''+"%"+name+"%"+'\''+"or articlename like"+'\''+"%"+name+"%"+'\'';
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
function select_k(k,callback){
    var se_nok="select distinct article, count(user) as count from followarticle group by article order by count desc";
    connection.query(se_nok, function(error, results) {
        if (error) {
            return console.error(error);
        }
        if(Object.keys(results).length===0){
            return callback(false);
        }
        return callback(results[k-1]);

    });
}
/*test.select_k(<no>,function(result){
    console.log(result.article);//the articleid
    console.log(result.count);//no. of likes
    console.log(result);//the row
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
    select_client_comment:select_client_comment,
    follow:follow,
    like_article:like_article,
    check_followers:check_followers,
    check_my_follow:check_my_follow,
    article_like:article_like,
    search:search,
    select_k:select_k,
    select_my_followees:select_my_followees,
    select_my_followers:select_my_followers,
    select_article_comment:select_article_comment,
    count_comment_no:count_comment_no,
    count_article_no:count_article_no,
    count_paragraph_no:count_paragraph_no,
    count_picture_no:count_picture_no

};







/*
// a new readfile.js later -> get the content of .txt files
var fs=require("fs");
var test=require('./test');
var connection=test.connection;

//put the contents of all paragraphs.txt files into a variable string and all the function
function select_paragraphs(arID,callback){
	test.select_article(arID,function(result){
 	    var para_times=result.parano;
  		//console.log(result.parano);
   		var string=[];
    	for(var i=0;i<para_times;i++){
    		var fileno=i+1;
    		var filename=fileno+".txt";
    		//console.log(filename);
    		var data=fs.readFileSync(filename);
    		string.push(data.toString());
   		}
    	return callback(string);
	});
}
select_paragraphs(<articleID>,function(result){
    console.log(result);
});
connection.end();
*/

/*
//put all comments of an article into an array -> result2 -> result2[i] -> result2[i].content
function select_comments(arID,callback){
	test.select_article_comment(arID,function(result1,result2){
		var comment_no=result1;
		var string=[];
		for(var i=0;i<comment_no;i++){
			string.push(result2[i].content);
		}
		return callback(string);
	});
}
select_comments(<articleID>,function(result){
    console.log(result);//print the array all at once
    //print the element one by one
    Object.keys(result).forEach(function(key){
        var row=result[key];
        console.log(row);

    });
});*/