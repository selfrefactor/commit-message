const eq = require('./shared/eq')
const listXf = require('./helpers/listXf')
const R = require('../../../../../rambda/dist/rambda.js')

describe('findLast', () => {
  const obj1 = { x : 100 }
  const obj2 = { x : 200 }
  const a = [ 11, 10, 9, 'cow', obj1, 8, 7, 100, 200, 300, obj2, 4, 3, 2, 1, 0 ]
  const even = function(x){ return x % 2 === 0 }
  const gt100 = function(x){ return x > 100 }
  const isStr = function(x){ return typeof x === 'string' }
  const xGt100 = function(o){ return o && o.x > 100 }
  const intoArray = R.into([])

  it('returns the index of the last element that satisfies the predicate', () => {
    eq(R.findLast(even, a), 0)
    eq(R.findLast(gt100, a), 300)
    eq(R.findLast(isStr, a), 'cow')
    eq(R.findLast(xGt100, a), obj2)
  })

  it('returns the index of the last element that satisfies the predicate into an array', () => {
    eq(intoArray(R.findLast(even), a), [ 0 ])
    eq(intoArray(R.findLast(gt100), a), [ 300 ])
    eq(intoArray(R.findLast(isStr), a), [ 'cow' ])
    eq(intoArray(R.findLast(xGt100), a), [ obj2 ])
  })

  it('returns `undefined` when no element satisfies the predicate', () => {
    eq(R.findLast(even, [ 'zing' ]), undefined)
  })

  it('returns `undefined` into an array when no element satisfies the predicate', () => {
    eq(intoArray(R.findLast(even), [ 'zing' ]), [ undefined ])
  })

  it('works when the first element matches', () => {
    eq(R.findLast(even, [ 2, 3, 5 ]), 2)
  })

  it('does not go into an infinite loop on an empty array', () => {
    eq(R.findLast(even, []), undefined)
  })

  it('dispatches to transformer objects', () => {
    eq(R.findLast(R.identity, listXf), {
      f  : R.identity,
      xf : listXf,
    })
  })
})
