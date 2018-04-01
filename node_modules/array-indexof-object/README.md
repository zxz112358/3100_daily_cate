### Quick

```sh
npm install array-indexof-object
```
```javascript
var oai = require('array-indexof-object')
var arr = [  {"a":"1","b":"2"}, {"a":"5","b":"2"},
             {"a":"1","b":"2"},
             {"b":"7"},{"a":"3","b":"7"}]
 
oai.firstIndexOf(arr, { "a": "5", "b": "2" }) //Return => 1

oai.allIndexesOf(arr, { "a": "1" })//Return => [0,2]

oai.lastIndexOf(arr, { "a": "1" }) //Return => 2

oai.nthIndexOf(arr, { "b": "7" }, 2) //Return => 4
```
### About 

A utility which implements well known,

- `firstIndexOf`

- `allIndexsOf` 

- `lastIndexOf` 

- `nthIndexOf`

functionality for an object array.

[![npm version](https://badge.fury.io/js/array-indexof-object.svg)](https://badge.fury.io/js/array-indexof-object)
[![npm](https://img.shields.io/npm/dw/array-indexof-object.svg)](https://www.npmjs.com/package/array-indexof-object)
[![Build Status](https://travis-ci.org/dim912/Object-Array-IndexOf.svg?branch=master)](https://travis-ci.org/dim912/Object-Array-IndexOf)
[![Code Climate](https://codeclimate.com/github/dim912/Object-Array-IndexOf/badges/gpa.svg)](https://codeclimate.com/github/dim912/Object-Array-IndexOf)

### Syntax

```
1) firstIndexOf (array, obj, optional : matchedBy )
2) allIndexesOf (array, obj, optional : matchedBy )
3) lastIndexOf (array, obj, optional : matchedBy )
4) nthIndexOf (array, obj, n ,optional : matchedBy )

* matchedBy => Refer 'selective match' section below
```

### Features

##### Full match
All properties of the parameter object, is matched with objects in array to find matching obejects. This is the default behaviour.

##### Selective match
Only a set of properties of the parameter object, is matched with objects in array to find matching obejects. This property set could be given in optional 'matchedBy' array argument.

### Examples

```javascript
var aio = require('array-indexof-object')
//object array
var arr = [ 
    {
        "a":"1",
        "b":"2"
    },
    {
        "a":"5",
        "b":"2"
    },
    {
        "a":"1",
        "b":"2"
    },
    {
        "b":"7"
    },
    {
        "a":"3",
        "b":"7"
    }
   ]
 
// firstIndexOf 
aio.firstIndexOf(arr, { "a": "5", "b": "2" })
//Return => 1
aio.firstIndexOf(arr, { "a": "1" })
//Return => 0
aio.firstIndexOf(arr, { "b": "8" }) 
//Return => -1

// allIndexesOf 
aio.allIndexesOf(arr, { "a": "5", "b": "2" }) 
//Return => [1]
aio.allIndexesOf(arr, { "a": "1" })
//Return => [0,2]
aio.allIndexesOf(arr, { "b": "8" }) 
//Return => []

// lastIndexOf 
aio.lastIndexOf(arr, { "a": "5", "b": "2" })
//Return => 1
aio.lastIndexOf(arr, { "a": "1" })
//Return => 2
aio.lastIndexOf(arr, { "b": "8" }) 
//Return => -1

// nthIndexOf 
// scan the array for {"b","7"} object.
// return the index when the object is found for the 2nd time
aio.nthIndexOf(arr, { "b": "7" }, 2)
//Return => 4

//Example Selective match
//match only the property "b" of object { "a": "5", "b": "2" }, with objects in array.
//return the index, when matched
aio.firstIndexOf(arr, { "a": "5", "b": "2" }, ["b"])
//Result=> 0 . 
//this is equalant to  => aio.firstIndexOf(arr, { "b": "2"})

```