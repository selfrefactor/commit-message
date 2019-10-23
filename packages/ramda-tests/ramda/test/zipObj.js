const eq = require('./shared/eq')
const R = require('../../../../../rambda/dist/rambda')

describe('zipObj', () => {
  it('combines an array of keys with an array of values into a single object', () => {
    eq(R.zipObj([ 'a', 'b', 'c' ], [ 1, 2, 3 ]), {
      a : 1,
      b : 2,
      c : 3,
    })
  })

  it('ignores extra values', () => {
    eq(R.zipObj([ 'a', 'b', 'c' ], [ 1, 2, 3, 4, 5, 6, 7 ]), {
      a : 1,
      b : 2,
      c : 3,
    })
  })

  it('ignores extra keys', () => {
    eq(R.zipObj([ 'a', 'b', 'c', 'd', 'e', 'f' ], [ 1, 2, 3 ]), {
      a : 1,
      b : 2,
      c : 3,
    })
  })

  it('last one in wins when there are duplicate keys', () => {
    eq(R.zipObj([ 'a', 'b', 'c', 'a' ], [ 1, 2, 3, 'LAST' ]), {
      a : 'LAST',
      b : 2,
      c : 3,
    })
  })

})
