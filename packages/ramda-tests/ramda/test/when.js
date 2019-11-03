const eq = require('./shared/eq')
const R = require('../../../../../rambda/dist/rambda.js')

describe('when', () => {
  it('calls the whenTrue function if the validator returns a truthy value', () => {
    eq(R.when(R.is(Number), R.add(1))(10), 11)
  })

  it('returns the argument unmodified if the validator returns a falsy value', () => {
    eq(R.when(R.is(Number), R.add(1))('hello'), 'hello')
  })

  it('returns a curried function', () => {
    const ifIsNumber = R.when(R.is(Number))
    eq(ifIsNumber(R.add(1))(15), 16)
    eq(ifIsNumber(R.add(1))('hello'), 'hello')
  })
})
