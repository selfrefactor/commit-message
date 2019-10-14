const eq = require('./shared/eq')
const R = require('rambda')

describe('nthArg', () => {
  it('returns a function which returns its nth argument', () => {
    eq(R.nthArg(0)('foo', 'bar'), 'foo')
    eq(R.nthArg(1)('foo', 'bar'), 'bar')
  })

  it('accepts negative offsets', () => {
    eq(R.nthArg(-1)('foo', 'bar'), 'bar')
    eq(R.nthArg(-2)('foo', 'bar'), 'foo')
    eq(R.nthArg(-3)('foo', 'bar'), undefined)
  })

  it('returns a function with length n + 1 when n >= 0', () => {
    eq(R.nthArg(0).length, 1)
    eq(R.nthArg(1).length, 2)
    eq(R.nthArg(2).length, 3)
    eq(R.nthArg(3).length, 4)
  })

  it('returns a function with length 1 when n < 0', () => {
    eq(R.nthArg(-1).length, 1)
    eq(R.nthArg(-2).length, 1)
    eq(R.nthArg(-3).length, 1)
  })

  it('returns a curried function', () => {
    eq(R.nthArg(1)('foo', 'bar'), R.nthArg(1)('foo')('bar'))
    eq(R.nthArg(2)('foo', 'bar', 'baz'), R.nthArg(2)('foo')('bar')('baz'))
  })
})
