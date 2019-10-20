const eq = require('./shared/eq')
const R = require('../../../../../rambda/dist/rambda')

describe('length', () => {
  it('returns the length of a list', () => {
    eq(R.length([]), 0)
    eq(R.length([ 'a', 'b', 'c', 'd' ]), 4)
  })

  it('returns the length of a string', () => {
    eq(R.length(''), 0)
    eq(R.length('xyz'), 3)
  })

  it('returns the length of a function', () => {
    eq(R.length(() => {}), 0)
    eq(R.length((x, y, z) => z), 3)
  })

  it('returns the length of an arguments object', () => {
    eq(R.length((function(){ return arguments })()), 0)
    eq(R.length((function(){ return arguments })('x', 'y', 'z')), 3)
  })

  it('returns NaN for value of unexpected type', () => {
    eq(R.identical(NaN, R.length(0)), true)
    eq(R.identical(NaN, R.length({})), true)
    eq(R.identical(NaN, R.length(null)), true)
    eq(R.identical(NaN, R.length(undefined)), true)
  })

  it('returns NaN for length property of unexpected type', () => {
    eq(R.identical(NaN, R.length({ length : '' })), true)
    eq(R.identical(NaN, R.length({ length : '1.23' })), true)
    eq(R.identical(NaN, R.length({ length : null })), true)
    eq(R.identical(NaN, R.length({ length : undefined })), true)
    eq(R.identical(NaN, R.length({})), true)
  })

})
