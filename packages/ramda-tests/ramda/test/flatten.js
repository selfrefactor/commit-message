const assert = require('assert')

const eq = require('./shared/eq')
const R = require('../../../../../rambda/dist/rambda.js')

describe('flatten', () => {
  it('turns a nested list into one flat list', () => {
    let nest = [ 1, [ 2 ], [ 3, [ 4, 5 ], 6, [ [ [ 7 ], 8 ] ] ], 9, 10 ]
    eq(R.flatten(nest), [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ])
    nest = [ [ [ [ 3 ] ], 2, 1 ], 0, [ [ -1, -2 ], -3 ] ]
    eq(R.flatten(nest), [ 3, 2, 1, 0, -1, -2, -3 ])
    eq(R.flatten([ 1, 2, 3, 4, 5 ]), [ 1, 2, 3, 4, 5 ])
  })

  it('is not destructive', () => {
    const nest = [ 1, [ 2 ], [ 3, [ 4, 5 ], 6, [ [ [ 7 ], 8 ] ] ], 9, 10 ]
    assert.notStrictEqual(R.flatten(nest), nest)
  })

  it('handles ridiculously large inputs', function(){
    this.timeout(10000)
    eq(
      R.flatten([ new Array(1000000), R.range(0, 56000), 5, 1, 3 ]).length,
      1056003
    )
  })

  it('handles array-like objects', () => {
    const o = {
      length : 3,
      0      : [ 1, 2, [ 3 ] ],
      1      : [],
      2      : [ 'a', 'b', 'c', [ 'd', 'e' ] ],
    }
    eq(R.flatten(o), [ 1, 2, 3, 'a', 'b', 'c', 'd', 'e' ])
  })

  it('flattens an array of empty arrays', () => {
    eq(R.flatten([ [], [], [] ]), [])
    eq(R.flatten([]), [])
  })
})
