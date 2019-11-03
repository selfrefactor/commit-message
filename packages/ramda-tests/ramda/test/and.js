const eq = require('./shared/eq')
const R = require('../../../../../rambda/dist/rambda.js')

describe('and', () => {
  it('compares two values with js &&', () => {
    eq(R.and(true, true), true)
    eq(R.and(true, false), false)
    eq(R.and(false, true), false)
    eq(R.and(false, false), false)
  })
})
