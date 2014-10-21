'use strict';

var assert = require('assert');

module.exports = function(array1, array2){

  assert.equal(array1 instanceof Array, true, 'first arguement should be an array');
  assert.equal(array2 instanceof Array, true, 'second arguement should be an array');

  if(array1.length !== array2.length) {
    return false;
  }

  function compareArrayElements(firstArray, secondArray){

    for(var i = 0; i < firstArray.length; i++) {

      if (firstArray[i] !== secondArray[i]) {

        // check if element is itself an array
        if (firstArray[i] instanceof Array && secondArray[i] instanceof Array) {

          if (!compareArrayElements(firstArray[i], secondArray[i])){
            return false;
          }

        } else {

          return false;
        }

      }
    }

    return true;

  }


  return compareArrayElements(array1, array2);

};
