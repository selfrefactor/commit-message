const eq = require('./shared/eq')
const R = require('rambda')

describe('dropWhile', () => {
  it('skips elements while the function reports `true`', () => {
    eq(R.dropWhile(x => x < 5, [ 1, 3, 5, 7, 9 ]), [ 5, 7, 9 ])
  })

  it('returns an empty list for an empty list', () => {
    eq(R.dropWhile(() => false, []), [])
    eq(R.dropWhile(() => true, []), [])
  })

  it('starts at the right arg and acknowledges undefined', () => {
    const sublist = R.dropWhile(x => x !== void 0, [ 1, 3, void 0, 5, 7 ])
    eq(sublist.length, 3)
    eq(sublist[ 0 ], void 0)
    eq(sublist[ 1 ], 5)
    eq(sublist[ 2 ], 7)
  })

  it('can operate on strings', () => {
    eq(R.dropWhile(x => x !== 'd', 'Ramda'), 'da')
  })

})
