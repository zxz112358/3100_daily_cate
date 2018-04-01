/**
 * @param {*} array 
 * @param {*} obj 
 * @param {*} matchedBy
 *
 *search the array for obj. Return the index on which the obj is found for the first time
 */
function firstIndexOf(array, obj, matchedBy) {
    for (var i = 0; i < array.length; i++) {
        var matched = matchOtoO(array[i], obj, matchedBy)
        if (matched) return i
    }
    return -1
}

/**
 * @param {*} array 
 * @param {*} obj 
 * @param {*} matchedBy
 *
 *search the array reverse side, for obj. Return the index on which the obj is found.
 */
function lastIndexOf(array, obj, matchedBy) {
    for (var i = array.length - 1; i >= 0; i--) {
        var matched = matchOtoO(array[i], obj, matchedBy)
        if (matched) return i
    }
    return -1
}
/**
 * @param {*} array 
 * @param {*} obj 
 * @param {*} matchedBy
 *
 * search the array for obj. Return all the indexs where obj is found
 */
function allIndexesOf(array, obj, matchedBy) {
    var indexs = []
    for (var i = 0; i < array.length; i++) {
        var matched = matchOtoO(array[i], obj, matchedBy)
        if (matched) indexs.push(i)
    }
    return indexs
}
/**
 * @param {*} array 
 * @param {*} obj 
 * @param {*} matchedBy 
 * @param {*} n
 *search the arry for obj. Return the index on which obj is found for nth time
 */
function nthIndexOf(array, obj, n, matchedBy) {
    if (n > array.length) return -1
    var count = 0;
    for (var i = 0; i < array.length; i++) {
        var matched = matchOtoO(array[i], obj, matchedBy)
        if (matched) count++
        if (count === n) return i
    }
    return -1
}

function matchOtoO(obj, compareObj, matchedBy) {
    for (var k in compareObj) {
        if (
            ((matchedBy && matchedBy.indexOf(k) > -1) || !matchedBy) &&
            (!obj.hasOwnProperty(k) || obj[k] !== compareObj[k])
        )
            return false
    }
    return true
}

module.exports = {
    firstIndexOf: firstIndexOf,
    lastIndexOf: lastIndexOf,
    allIndexesOf: allIndexesOf,
    nthIndexOf: nthIndexOf
}
