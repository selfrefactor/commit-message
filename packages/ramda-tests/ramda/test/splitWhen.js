const eq = require('./shared/eq')
const R = require('../../../../../rambda/dist/rambda')

describe('splitWhen', () => {
  it('splits an array at the first instance to satisfy the predicate', () => {
    eq(R.splitWhen(R.equals(2), [ 1, 2, 3 ]), [ [ 1 ], [ 2, 3 ] ])
  })

  it('retains all original elements', () => {
    eq(R.splitWhen(R.T, [ 1, 1, 1 ]), [ [], [ 1, 1, 1 ] ])
  })

  it('only splits once', () => {
    eq(R.splitWhen(R.equals(2), [ 1, 2, 3, 1, 2, 3 ]), [ [ 1 ], [ 2, 3, 1, 2, 3 ] ])
  })
})
