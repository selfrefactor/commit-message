const eq = require('./shared/eq')
const R = require('../../../../../rambda/dist/rambda.js')

describe('sum', () => {
  it('adds together the array of numbers supplied', () => {
    eq(R.sum([ 1, 2, 3, 4 ]), 10)
  })

  it('does not save the state of the accumulator', () => {
    eq(R.sum([ 1, 2, 3, 4 ]), 10)
    eq(R.sum([ 1 ]), 1)
    eq(R.sum([ 5, 5, 5, 5, 5 ]), 25)
  })

})
