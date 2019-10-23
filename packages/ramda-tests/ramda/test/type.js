const eq = require('./shared/eq')
const R = require('../../../../../rambda/dist/rambda')

describe('type', () => {

  it('"Array" if given an array literal', () => {
    eq(R.type([ 1, 2, 3 ]), 'Array')
  })

  // it('"Arguments" if given an arguments object', function() {
  //   var args = (function() { return arguments; }());
  //   eq(R.type(args), 'Arguments');
  // });

  it('"Object" if given an object literal', () => {
    eq(R.type({ batman : 'na na na na na na na' }), 'Object')
  })

  it('"RegExp" if given a RegExp literal', () => {
    eq(R.type(/[A-z]/), 'RegExp')
  })

  it('"Number" if given a numeric value', () => {
    eq(R.type(4), 'Number')
  })

  it('"Number" if given the NaN value', () => {
    eq(R.type(NaN), 'Number')
  })

  it('"String" if given a String literal', () => {
    eq(R.type('Gooooodd Mornning Ramda!!'), 'String')
  })

  it('"String" if given a String object', () => {
    eq(R.type(new String('I am a String object')), 'String')
  })

  it('"Null" if given the null value', () => {
    eq(R.type(null), 'Null')
  })

  it('"Undefined" if given the undefined value', () => {
    eq(R.type(undefined), 'Undefined')
  })

})
