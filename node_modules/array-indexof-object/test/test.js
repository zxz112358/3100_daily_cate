var expect = require("chai").expect;
var objectarrayindexof = require('../src/index.js')

var arr1 = [
    {
        "a": "21"
    },
    {
        "a": "1",
        "b": "2"
    },
    {
        "a": "3",
        "b": "5"
    }
    ,
    {
        "a": "1",
        "b": "2"
    },
    {
        "a": "45"
    },
    {
        "a": "3",
        "b": "5"
    },
    {
        "a": "98"
    }
]

describe("firstIndexOf function", function () {
    it("with out keys positive", function () {
        expect(objectarrayindexof.firstIndexOf(arr1, { "a": "3", "b": "5" })).to.deep.equal(2)
    });
    it("with out keys negative", function () {
        expect(objectarrayindexof.firstIndexOf(arr1, { "a": "1", "b": "5" })).to.deep.equal(-1)
    });
    it("with keys positive", function () {
        expect(objectarrayindexof.firstIndexOf(arr1, { "a": "8", "b": "5" }, ["b"])).to.deep.equal(2)
    });
    it("with keys negative", function () {
        expect(objectarrayindexof.firstIndexOf(arr1, { "a": "8", "b": "9" }, ["b"])).to.deep.equal(-1)
    });
    it("small object in array", function () {
        expect(objectarrayindexof.firstIndexOf(arr1, { "a": "8", "b": "98" }, ["a", "b"])).to.deep.equal(-1)
    });
});

describe("lastIndexOf function", function () {
    it("with out keys positive", function () {
        expect(objectarrayindexof.lastIndexOf(arr1, { "a": "3", "b": "5" })).to.deep.equal(5)
    });
    it("with out keys negative", function () {
        expect(objectarrayindexof.lastIndexOf(arr1, { "a": "1", "b": "5" })).to.deep.equal(-1)
    });
    it("with keys positive", function () {
        expect(objectarrayindexof.lastIndexOf(arr1, { "a": "8", "b": "5" }, ["b"])).to.deep.equal(5)
    });
    it("with keys negative", function () {
        expect(objectarrayindexof.lastIndexOf(arr1, { "a": "8", "b": "9" }, ["b"])).to.deep.equal(-1)
    });
    it("small object in array", function () {
        expect(objectarrayindexof.lastIndexOf(arr1, { "a": "8", "b": "98" }, ["a", "b"])).to.deep.equal(-1)
    });

});


describe("allIndexesOf function", function () {
    it("with out keys positive", function () {
        expect(objectarrayindexof.allIndexesOf(arr1, { "a": "3", "b": "5" })).to.deep.equal([2, 5])
    });
    it("with out keys negative", function () {
        expect(objectarrayindexof.allIndexesOf(arr1, { "a": "1", "b": "5" })).to.deep.equal([])
    });
    it("with keys positive", function () {
        expect(objectarrayindexof.allIndexesOf(arr1, { "a": "8", "b": "5" }, ["b"])).to.deep.equal([2, 5])
    });
    it("with keys negative", function () {
        expect(objectarrayindexof.allIndexesOf(arr1, { "a": "8", "b": "9" }, ["b"])).to.deep.equal([])
    });
    it("small object in array", function () {
        expect(objectarrayindexof.allIndexesOf(arr1, { "a": "8", "b": "98" }, ["a", "b"])).to.deep.equal([])
    });

});

describe("nthIndexOf function", function () {
    it("with out keys positive", function () {
        expect(objectarrayindexof.nthIndexOf(arr1, { "b": "2" }, 2)).to.deep.equal(3)
    });
});


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


describe("Documentation", function () {

    //Example - firstIndexOf method 
    it("with out keys positive", function () {

        var res1 = objectarrayindexof.firstIndexOf(arr, { "a": "5", "b": "2" })
        //Return => 1 
        var res2 = objectarrayindexof.firstIndexOf(arr, { "a": "1" })
        //Return => 0 
        var res3 = objectarrayindexof.firstIndexOf(arr, { "b": "8" })
        //Return => -1 

        // Example - lastIndexOf method 
        var res4 = objectarrayindexof.lastIndexOf(arr, { "a": "5", "b": "2" })
        //Return => 1 
        var res5 = objectarrayindexof.lastIndexOf(arr, { "a": "1" })
        //Return => 2 
        var res6 = objectarrayindexof.lastIndexOf(arr, { "b": "8" })
        //Return => -1 

        //Example - lastIndexOf method 
        var res7 = objectarrayindexof.allIndexesOf(arr, { "a": "5", "b": "2" })
        //Return => [1] 
        var res8 = objectarrayindexof.allIndexesOf(arr, { "a": "1" })
        //Return => [0,2] 
        var res9 = objectarrayindexof.allIndexesOf(arr, { "b": "8" })
        //Return => [] 

        //Example - nthIndexOf method
        var res10 = objectarrayindexof.nthIndexOf(arr, { "b": "7" }, 2)
        //Return => 4

        //Example Selective match
        var arr11 = objectarrayindexof.firstIndexOf(arr, { "a": "5", "b": "2" }, ["b"])
        //Result=> 0 . 
        var arr12 = objectarrayindexof.firstIndexOf(arr, { "b": "2" })

        expect(res1).to.deep.equal(1)
        expect(res2).to.deep.equal(0)
        expect(res3).to.deep.equal(-1)

        expect(res4).to.deep.equal(1)
        expect(res5).to.deep.equal(2)
        expect(res6).to.deep.equal(-1)

        expect(res7).to.deep.equal([1])
        expect(res8).to.deep.equal([0, 2])
        expect(res9).to.deep.equal([])

        expect(res10).to.deep.equal(4)

        expect(arr11).to.deep.equal(0)
        expect(arr12).to.deep.equal(0)

    })
})