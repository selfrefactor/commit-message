const assert = require('assert')

const eq = require('./shared/eq')
const R = require('../../../../../rambda/dist/rambda')

describe('test', () => {

  it('returns true if string matches pattern', () => {
    eq(R.test(/^x/, 'xyz'), true)
  })

  it('returns false if string does not match pattern', () => {
    eq(R.test(/^y/, 'xyz'), false)
  })

  it('is referentially transparent', () => {
    const pattern = /x/g
    eq(pattern.lastIndex, 0)
    eq(R.test(pattern, 'xyz'), true)
    eq(pattern.lastIndex, 0)
    eq(R.test(pattern, 'xyz'), true)
  })

  it('throws if first argument is not a regexp', () => {
    assert.throws(
      () => { R.test('foo', 'bar') },
      err => err.constructor === TypeError &&
               err.message === '‘test’ requires a value of type RegExp ' +
                               'as its first argument; received "foo"'
    )
  })

})
