'use strict';
var expect    = require('expect.js')
  , catchErr  = require('catch-error')
  , comparray = require('../index');

describe('comparray module', function(){

  describe('when passing arrays as 1st and second arguments', function(){
    it('should return something', function(){
      // arrange
      var arg1 = [];
      var arg2 = [];
      // act
      var result = comparray(arg1, arg2);
      // assert
      expect(result).not.to.be(undefined);
    });
  });

  describe('when passing anything other than an array as the 1st argument', function(){
    it('should throw an exception', function(){
      // arrange
      var arg1 = 'String';
      var arg2 = [];
      // act
      var result = catchErr({ func: comparray, args: [arg1, arg2] });
      // assert
      expect(result).to.be.an(Error);
    });
  });

  describe('when passing anything other than an array as the 2nd argument', function(){
    it('should throw an exception', function(){
      // arrange
      var arg1 = [];
      var arg2 = 'String';
      // act
      var result = catchErr({ func: comparray, args: [arg1, arg2] });
      // assert
      expect(result).to.be.an(Error);
    });
  });

  describe('when passing arrays as 1st and 2nd arguments without a 3rd argument', function(){
    it('should return true if the arrays have the same length', function(){
      // arrange
      var arg1 = [1,2];
      var arg2 = [1,2];
      // act
      var result = comparray(arg1, arg2);
      // assert
      expect(result).to.be(true);
    });
    it('should return false if the arrays have different lengths', function(){
      // arrange
      var arg1 = [1,2];
      var arg2 = [1,2,3];
      // act
      var result = comparray(arg1, arg2);
      // assert
      expect(result).to.be(false);
    });
    it('should return false if the arrays have differing elements', function(){
      // arrange
      var arg1 = [1,2];
      var arg2 = [3,4];
      // act
      var result = comparray(arg1, arg2);
      // assert
      expect(result).to.be(false);
    });
    it('should return true if the arrays have the same elements', function(){
      // arrange
      var arg1 = [1,2];
      var arg2 = [1,2];
      // act
      var result = comparray(arg1, arg2);
      // assert
      expect(result).to.be(true);
    });
    it('should return true if nested arrays have the same elements', function(){
      // arrange
      var arg1 = [1,2,[1,2]];
      var arg2 = [1,2,[1,2]];
      // act
      var result = comparray(arg1, arg2);
      // assert
      expect(result).to.be(true);
    });
    it('should return true if nested arrays have the same elements', function(){
      // arrange
      var arg1 = [1,2,[2,[3]]];
      var arg2 = [1,2,[2,[3]]];
      // act
      var result = comparray(arg1, arg2);
      // assert
      expect(result).to.be(true);
    });
    it('should return true if nested arrays have the same elements', function(){
      // arrange
      var arg1 = [1,[2,2],[3,[4]]];
      var arg2 = [1,[2,2],[3,[4]]];
      // act
      var result = comparray(arg1, arg2);
      // assert
      expect(result).to.be(true);
    });
    it('should return false if nested arrays have differing elements', function(){
      // arrange
      var arg1 = [1,2,[1,2]];
      var arg2 = [1,2,[3,4]];
      // act
      var result = comparray(arg1, arg2);
      // assert
      expect(result).to.be(false);
    });
    it('should return true if matching elements are the same object', function(){
      // arrange
      var obj1 = {};
      var arg1 = [ 1, 2, obj1 ];
      var arg2 = [ 1, 2, obj1 ];
      // act
      var result = comparray(arg1, arg2);
      // assert
      expect(result).to.be(true);
    });
    it('should return false if matching elements are different objects', function(){
      // arrange
      var obj1 = {};
      var obj2 = {};
      var arg1 = [ 1, 2, obj1 ];
      var arg2 = [ 1, 2, obj2 ];
      // act
      var result = comparray(arg1, arg2);
      // assert
      expect(result).to.be(false);
    });
  });

});
