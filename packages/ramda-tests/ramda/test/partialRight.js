const eq = require('./shared/eq')
const R = require('rambda')

describe('partialRight', () => {
  const disc = function(a, b, c){ // note disc(3, 7, 4) => 1
    return b * b - 4 * a * c
  }

  it('caches the initially supplied arguments', () => {
    const f = R.partialRight(disc, [ 4 ])
    eq(f(3, 7), 1)
    const g = R.partialRight(disc, [ 7, 4 ])
    eq(g(3), 1)
  })

  it('correctly reports the arity of the new function', () => {
    const f = R.partialRight(disc, [ 4 ])
    eq(f.length, 2)
    const g = R.partialRight(disc, [ 7, 4 ])
    eq(g.length, 1)
  })

})
