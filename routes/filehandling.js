/*// a new readfile.js later -> get the content of .txt files
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
});*/
//connection.end();


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