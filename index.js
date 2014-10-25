'use strict';

var assert = require('assert');

module.exports = function(array1, array2, options){

  options = options || {};

  // check argument types and return an error if needed
  assert.equal(Array.isArray(array1), true, 'first arguement should be an array');
  assert.equal(Array.isArray(array2), true, 'second arguement should be an array');
  assert.equal(typeof options, 'object', 'third argument should be an object');

  if(array1.length !== array2.length) {
    return false;
  }

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


  return compareArrayElements(array1, array2);

};
