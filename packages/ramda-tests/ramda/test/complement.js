const S = require('sanctuary')

const eq = require('./shared/eq')
const R = require('rambda')

describe('complement', () => {
  it('creates boolean-returning function that reverses another', () => {
    const even = function(x){ return x % 2 === 0 }
    const f = R.complement(even)
    eq(f(8), false)
    eq(f(13), true)
  })

  it('accepts a function that take multiple parameters', () => {
    const between = function(a, b, c){ return a < b && b < c }
    const f = R.complement(between)
    eq(f(4, 5, 11), false)
    eq(f(12, 2, 6), true)
  })

  it('accepts fantasy-land functors', () => {
    const { Just } = S
    const { Nothing } = S
    eq(R.complement(Just(true)), Just(false))
    eq(R.complement(Just(false)), Just(true))
    eq(R.complement(Nothing()), Nothing())
  })

})
