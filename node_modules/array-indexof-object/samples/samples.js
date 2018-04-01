var objectarrayindexof = require('../src/index.js')

var arr = [
    {
        "a": "1",
        "b": "2"
    },
    {
        "a": "5",
        "b": "2"
    },
    {
        "a": "1",
        "b": "2"
    },
    {
        "b": "7"
    },
    {
        "a": "3",
        "b": "7"
    }
]

var res1 = objectarrayindexof.firstIndexOf(arr, { "a": "5", "b": "2" })
console.log("res1:" + res1)
//Return => 1 
var res2 = objectarrayindexof.firstIndexOf(arr, { "a": "1" })
//Return => 0 
console.log("res2:" + res2)

var res3 = objectarrayindexof.firstIndexOf(arr, { "b": "8" })
//Return => -1 
console.log("res3:" + res3)


// Example - lastIndexOf method 
var res4 = objectarrayindexof.lastIndexOf(arr, { "a": "5", "b": "2" })
//Return => 1 
console.log("res4:" + res4)

var res5 = objectarrayindexof.lastIndexOf(arr, { "a": "1" })
//Return => 2 
console.log("res5:" + res5)

var res6 = objectarrayindexof.lastIndexOf(arr, { "b": "8" })
//Return => -1 
console.log("res6:" + res6)


//Example - lastIndexOf method 
var res7 = objectarrayindexof.allIndexesOf(arr, { "a": "5", "b": "2" })
//Return => [1] 
console.log("res7:" + JSON.stringify(res7))

var res8 = objectarrayindexof.allIndexesOf(arr, { "a": "1" })
//Return => [0,2] 
console.log("res8:" + JSON.stringify(res8))

var res9 = objectarrayindexof.allIndexesOf(arr, { "b": "8" })
//Return => [] 
console.log("res9:" + JSON.stringify(res9))


//Example - nthIndexOf method
var res10 = objectarrayindexof.nthIndexOf(arr, { "b": "7" }, 2)
//Return => 4
console.log("res10:" + res10)


//Example Selective match
var arr11 = objectarrayindexof.firstIndexOf(arr, { "a": "5", "b": "2" }, ["b"])
//Result=> 0 . 
console.log("arr11:" + arr11)

var arr12 = objectarrayindexof.firstIndexOf(arr, { "b": "2" })
console.log("arr12:" + arr12)
//Result=> 0 .