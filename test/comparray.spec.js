'use strict';
var expect    = require('expect.js')
  , catchErr  = require('catch-error')
  , comparray = require('../index');

describe('comparray module', function(){

  /*
   * test for valid arguments
   */
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

  describe('when passing anything other than an object as the 3rd argument', function(){
    it('should throw an exception if 3rd arg is a string', function(){
      // arrange
      var arg1 = [];
      var arg2 = [];
      var arg3 = 'string';
      // act
      var result = catchErr({ func: comparray, args: [arg1, arg2, arg3] });
      // assert
      expect(result).to.be.an(Error);
    });
  });

  /*
   * test array comparision without optional 3rd argument
   */
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

    // test for comparing NaN with NaN
    describe('passing matching arrays with NaN elements in the same index', function(){
      it('should return true', function(){
        // arrange
        var arg1 = [1, 2, NaN, 4];
        var arg2 = [1, 2, NaN, 4];
        // act
        var result = comparray(arg1, arg2);
        // assert
        expect(result).to.be(true);
      });
    });

  });

  /*
   * test optional 3rd argument (option object)
   */
  describe('when passing arrays as 1st and 2nd arguments with a 3rd argument', function(){
    describe('if the arrays match and the third argument is an empty object', function(){
      it('should return true', function(){
        var arr1 = ['one', 'two'];
        var arr2 = ['one', 'two'];
        var obj  = {};
        var result = comparray(arr1, arr2, obj);
        expect(result).to.be(true);
      });
    });

    // test diff options
    describe('if the third argument contains the key show', function(){

      describe('with value: missing', function(){
        it('should return the elements in array1 that are not in array2', function(){
          var arr1 = ['one', 'two', 'three', 'four'];
          var arr2 = ['one', 'two'];
          var obj  = {
            show: 'missing'
          };
          var expected = ['three', 'four'];
          var result = comparray(arr1, arr2, obj);
          expect(result).to.eql(expected);
        });
      });

      describe('with value: common', function(){
        it('should return the elements in array1 that are also in array2', function(){
          var arr1 = ['one', 'two', 'three', 'four'];
          var arr2 = ['one', 'three', 'four', 'five'];
          var obj  = {
            show: 'common'
          };
          var expected = ['one', 'three', 'four'];
          var result = comparray(arr1, arr2, obj);
          expect(result).to.eql(expected);
        });
      });

      describe('with value: likeness', function(){
        it('should return a decimal fraction of elements common to both arrays', function(){
          var arr1 = ['one', 'two', 'three', 'four'];
          var arr2 = ['one', 'two'];
          var obj  = {
            show: 'likeness'
          };
          var expected = 0.5;
          var result = comparray(arr1, arr2, obj);
          expect(result).to.equal(expected);
        });
      });

    });
  });

});
