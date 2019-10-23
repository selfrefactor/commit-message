const assert = require('assert')

const eq = require('./shared/eq')
const R = require('../../../../../rambda/dist/rambda')

describe('takeLast', () => {

  it('takes only the last `n` elements from a list', () => {
    eq(R.takeLast(3, [ 'a', 'b', 'c', 'd', 'e', 'f', 'g' ]), [ 'e', 'f', 'g' ])
  })

  it('returns only as many as the array can provide', () => {
    eq(R.takeLast(3, [ 1, 2 ]), [ 1, 2 ])
    eq(R.takeLast(3, []), [])
  })

  it('returns an equivalent list if `n` is < 0', () => {
    eq(R.takeLast(-1, [ 1, 2, 3 ]), [ 1, 2, 3 ])
    eq(R.takeLast(-Infinity, [ 1, 2, 3 ]), [ 1, 2, 3 ])
  })

  it('never returns the input array', () => {
    const xs = [ 1, 2, 3 ]

    assert.notStrictEqual(R.takeLast(3, xs), xs)
    assert.notStrictEqual(R.takeLast(Infinity, xs), xs)
    // assert.notStrictEqual(R.takeLast(-1, xs), xs);
  })

  it('can operate on strings', () => {
    eq(R.takeLast(3, 'Ramda'), 'mda')
  })

  it('handles zero correctly (#1224)', () => {
    eq(R.takeLast(0, [ 1, 2, 3 ]), [])
  })

})
