const eq = require('./shared/eq')
const R = require('../../../../../rambda/dist/rambda')

describe('difference', () => {
  const M = [ 1, 2, 3, 4 ]
  const N = [ 3, 4, 5, 6 ]
  const M2 = [ 1, 2, 3, 4, 1, 2, 3, 4 ]
  const N2 = [ 3, 3, 4, 4, 5, 5, 6, 6 ]
  const Z = [ 3, 4, 5, 6, 10 ]
  const Z2 = [ 1, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 8 ]
  it('finds the set of all elements in the first list not contained in the second', () => {
    eq(R.difference(M, N), [ 1, 2 ])
  })

  it('does not allow duplicates in the output even if the input lists had duplicates', () => {
    const M2 = [ 1, 2, 3, 4, 1, 2, 3, 4 ]
    const N2 = [ 3, 3, 4, 4, 5, 5, 6, 6 ]
    eq(R.difference(M2, N2), [ 1, 2 ])
  })

  it('has R.equals semantics', () => {
    function Just(x){ this.value = x }
    Just.prototype.equals = function(x){
      return x instanceof Just && R.equals(x.value, this.value)
    }

    eq(R.difference([ 0 ], [ -0 ]).length, 1)
    eq(R.difference([ -0 ], [ 0 ]).length, 1)
    eq(R.difference([ NaN ], [ NaN ]).length, 0)
    eq(R.difference([ new Just([ 42 ]) ], [ new Just([ 42 ]) ]).length, 0)
  })

  it('works for arrays of different lengths', () => {
    eq(R.difference(Z, Z2), [ 10 ])
    eq(R.difference(Z2, Z), [ 1, 2, 7, 8 ])
  })

  it('will not create a "sparse" array', () => {
    eq(R.difference(M2, [ 3 ]).length, 3)
  })

  it('returns an empty array if there are no different elements', () => {
    eq(R.difference(M2, M), [])
    eq(R.difference(M, M2), [])
    eq(R.difference([], M2), [])
  })

})
