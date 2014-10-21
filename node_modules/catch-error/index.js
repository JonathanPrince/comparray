'use strict';

module.exports = function catchError(options) {
  var context = options.context || this
  try {
    options.func.apply(context, options.args)
  } catch (err) {
    return err
  }
}
