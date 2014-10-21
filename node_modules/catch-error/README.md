Catch Error
===========

A handy helper to make testing whether an error was thrown just a little bit nicer.

```js
// some test setup...
function myFunc(arg1, arg2) {
  throw new Error('wat')
}

var error = catchError({ func: myFunc, args: ['hi', 'there'] })
expect(error).to.be.an.instanceof(Error)
expect(error.message).to.equal('wat')
```

You may also need to set context for your function if it has been constructed
with the `new` keyword. You can do this by passing in `context` like so:
```js
var error = catchError({ func: myFunc, context: this })
```
