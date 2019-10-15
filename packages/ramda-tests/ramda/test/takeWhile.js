const assert = require('assert')

const eq = require('./shared/eq')
const R = require('../../../../../rambda/dist/rambda')

describe('takeWhile', () => {
  it('continues taking elements while the function reports `true`', () => {
    eq(R.takeWhile(x => x !== 5, [ 1, 3, 5, 7, 9 ]), [ 1, 3 ])
  })

  it('starts at the right arg and acknowledges undefined', () => {
    eq(R.takeWhile(() => { assert(false) }, []), [])
    eq(R.takeWhile(x => x !== void 0, [ 1, 3, void 0, 5, 7 ]), [ 1, 3 ])
  })

  it('can operate on strings', () => {
    eq(R.takeWhile(x => x !== 'd', 'Ramda'), 'Ram')
  })

})
