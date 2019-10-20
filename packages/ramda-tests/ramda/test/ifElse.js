const eq = require('./shared/eq')
const R = require('../../../../../rambda/dist/rambda')

describe('ifElse', () => {
  const t = function(a){ return a + 1 }
  const identity = function(a){ return a }
  const isArray = function(a){ return Object.prototype.toString.call(a) === '[object Array]' }

  it('calls the truth case function if the validator returns a truthy value', () => {
    const v = function(a){ return typeof a === 'number' }
    eq(R.ifElse(v, t, identity)(10), 11)
  })

  it('calls the false case function if the validator returns a falsy value', () => {
    const v = function(a){ return typeof a === 'number' }
    eq(R.ifElse(v, t, identity)('hello'), 'hello')
  })

  it('calls the true case on array items and the false case on non array items', () => {
    const list = [ [ 1, 2, 3, 4, 5 ], 10, [ 0, 1 ], 15 ]
    const arrayToLength = R.map(R.ifElse(isArray, R.prop('length'), identity))
    eq(arrayToLength(list), [ 5, 10, 2, 15 ])
  })

  it('passes the arguments to the true case function', () => {
    const v = function(){ return true }
    const onTrue = function(a, b){
      eq(a, 123)
      eq(b, 'abc')
    }
    R.ifElse(v, onTrue, identity)(123, 'abc')
  })

  it('passes the arguments to the false case function', () => {
    const v = function(){ return false }
    const onFalse = function(a, b){
      eq(a, 123)
      eq(b, 'abc')
    }
    R.ifElse(v, identity, onFalse)(123, 'abc')
  })

  it('returns a function whose arity equals the max arity of the three arguments to `ifElse`', () => {
    function a0(){ return 0 }
    function a1(x){ return x }
    function a2(x, y){ return x + y }

    eq(R.ifElse(a0, a1, a2).length, 2)
    eq(R.ifElse(a0, a2, a1).length, 2)
    eq(R.ifElse(a1, a0, a2).length, 2)
    eq(R.ifElse(a1, a2, a0).length, 2)
    eq(R.ifElse(a2, a0, a1).length, 2)
    eq(R.ifElse(a2, a1, a0).length, 2)
  })

  it('returns a curried function', () => {
    const v = function(a){ return typeof a === 'number' }
    const ifIsNumber = R.ifElse(v)
    eq(ifIsNumber(t, identity)(15), 16)
    eq(ifIsNumber(t, identity)('hello'), 'hello')

    const fn = R.ifElse(R.gt, R.subtract, R.add)
    eq(fn(2)(7), 9)
    eq(fn(2, 7), 9)
    eq(fn(7)(2), 5)
    eq(fn(7, 2), 5)
  })

})
