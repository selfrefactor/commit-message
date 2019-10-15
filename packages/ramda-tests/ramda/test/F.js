const eq = require('./shared/eq')
const R = require('../../../../../rambda/dist/rambda')

describe('F', () => {
  it('always returns false', () => {
    eq(R.F(), false)
    eq(R.F(10), false)
    eq(R.F(true), false)
  })

})
