'use strict';

var assert = require('assert');

module.exports = function(arr1, arr2){

  assert.equal(arr1 instanceof Array, true, 'first arguement should be an array');
  assert.equal(arr2 instanceof Array, true, 'second arguement should be an array');

  if(arr1.length !== arr2.length) {
    return false;
  }


  for(var i = 0; i < arr1.length; i++) {

    if (arr1[i] !== arr2[i]) {

      // check if element is itself an array
      if (arr1[i] instanceof Array && arr1[i] instanceof Array) {

        for (var j = 0; j < arr1[i].length; j++){

          if (arr1[i][j] !== arr2[i][j]) return false;

        }

      } else {

        return false;
      }
    }
  }

  return true;
};
