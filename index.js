'use strict';

var assert = require('assert');

module.exports = function(arr1, arr2){

  assert.equal(arr1 instanceof Array, true, 'first arguement should be an array');
  assert.equal(arr2 instanceof Array, true, 'second arguement should be an array');

  return true;

};
