var R = require('../../../../../rambda/dist/rambda.js');
var eq = require('./shared/eq');


describe('multiply', function() {
  it('multiplies together two numbers', function() {
    eq(R.multiply(6, 7), 42);
  });

});
