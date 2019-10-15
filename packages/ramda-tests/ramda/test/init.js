const assert = require('assert')

const eq = require('./shared/eq')
const R = require('../../../../../rambda/dist/rambda')

describe('init', () => {

  it('returns all but the last element of an ordered collection', () => {
    eq(R.init([ 1, 2, 3 ]), [ 1, 2 ])
    eq(R.init([ 2, 3 ]), [ 2 ])
    eq(R.init([ 3 ]), [])
    eq(R.init([]), [])

    eq(R.init('abc'), 'ab')
    eq(R.init('bc'), 'b')
    eq(R.init('c'), '')
    eq(R.init(''), '')
  })

  it('throws if applied to null or undefined', () => {
    assert.throws(() => { R.init(null) }, TypeError)
    assert.throws(() => { R.init(undefined) }, TypeError)
  })

  it('handles array-like object', () => {
    const args = (function(){ return arguments }(1, 2, 3, 4, 5))
    eq(R.init(args), [ 1, 2, 3, 4 ])
  })

})
