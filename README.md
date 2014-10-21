#comparray
=========

Node Module for comparing arrays

[![Build Status](https://travis-ci.org/JonathanPrince/comparray.svg?branch=master)](https://travis-ci.org/JonathanPrince/comparray)

[![NPM](https://nodei.co/npm/comparray.png?downloads=true)](https://nodei.co/npm/comparray/)

##Syntax

```comparray(array1, array2)```

##Output

Will return `true` if the two arrays are the same.

##Usage

Installation

```
$ npm install comparray
```

Example
```js

var comparray = require('comparray');

var array1 = [ 0, 1, 2, 3 ];
var array2 = [ 0, 1, 2, 3 ];

var result = comparray(array1, array2);     // result will be true

array2.push(4);

var result2 = comparray(array1, array2);    // result will be false

```
