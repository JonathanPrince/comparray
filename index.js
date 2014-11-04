'use strict';

var assert = require('assert');

module.exports = function(array1, array2, options){

  options = options || {};

  // check argument types and return an error if needed
  assert.equal(Array.isArray(array1), true, 'first arguement should be an array');
  assert.equal(Array.isArray(array2), true, 'second arguement should be an array');
  assert.equal(typeof options, 'object', 'third argument should be an object');

  function compareArrayElements(firstArray, secondArray){

    for(var i = 0; i < firstArray.length; i++) {

      if (firstArray[i] !== secondArray[i]) {

        // check if element is itself an array
        if (Array.isArray(firstArray[i]) && Array.isArray(secondArray[i])) {

          if (!compareArrayElements(firstArray[i], secondArray[i])){
            return false;
          }

        } else if (Number.isNaN(firstArray[i]) && Number.isNaN(secondArray[i])) {
          continue;
        } else {

          return false;
        }
      }
    }

    return true;

  }

  function diff_missing(firstArray, secondArray) {

    var result = [];
    var el;

    for (var i = 0;i < firstArray.length;i++) {

      el = firstArray[i];

      if (secondArray.indexOf(el) === -1){
        result.push(el);
      }
    }

    return result;

  }

  function diff_common(firstArray, secondArray) {

    var el, arrA, arrB;
    var result = [];

    if (firstArray.length >= secondArray.length) {
      arrA = firstArray;
      arrB = secondArray;
    } else {
      arrA = secondArray;
      arrB = firstArray;
    }

    for (var i = 0;i < arrA.length;i++) {
      el = arrA[i];
      if (arrB.indexOf(el) >= 0) {
        result.push(el);
      }
    }

    return result;

  }

  if(options.hasOwnProperty('show')) {

    switch(options.show) {

      case 'missing':
        return diff_missing(array1, array2);

      case 'common':
        return diff_common(array1, array2);

      default:
        return compareArrayElements(array1, array2);

    }

  } else {

    if (array1.length !== array2.length) {
      return false;
    }

    return compareArrayElements(array1, array2);

  }

};
