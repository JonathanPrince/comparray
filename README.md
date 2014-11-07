#comparray

Node Module for comparing arrays

[![Build Status](https://travis-ci.org/JonathanPrince/comparray.svg?branch=master)](https://travis-ci.org/JonathanPrince/comparray)

[![NPM](https://nodei.co/npm/comparray.png?downloads=true)](https://nodei.co/npm/comparray/)

##Syntax

```comparray(array1, array2[, options])```

**array1, array2**

Arrays to compare.

**options** (optional)

Options for the comparision.

##Output

When used without the options argument the module will return `true` if the two arrays are the same.

Optionally, returns an array determined by the options argument.

##Usage

Installation

```
$ npm install comparray
```

Basic Example
```js

var comparray = require('comparray');

var array1 = [ 0, 1, 2, 3 ];
var array2 = [ 0, 1, 2, 3 ];

var result = comparray(array1, array2);     // result will be true

array2.push(4);

var result2 = comparray(array1, array2);    // result2 will be false

```

Example using options
```js

var comparray = require('comparray');

var array1 = [ 0, 1, 2, 3 ];
var array2 = [ 0, 1 ];

var result = comparray(array1, array2, {show: 'missing'});     // result will be [ 2, 3 ]

var result2 = comparray(array1, array2, {show: 'common'});     // result2 will be [ 0, 1 ]

var result3 = comparray(array1, array2, {show: 'likeness'});   // result3 will be 0.5

```
