const eq = require('./shared/eq')
const R = require('../../../../../rambda/dist/rambda.js')

describe('isEmpty', () => {
})
describe('isEmpty', () => {
  it('returns true for empty string', () => {})
  it('returns true for empty array', () => {})
  it('returns true for empty typed array', () => {
    eq(R.isEmpty(Uint8Array.from('')), true)
    eq(R.isEmpty(Float32Array.from('')), true)
    eq(R.isEmpty(new Float32Array([])), true)
    eq(R.isEmpty(Uint8Array.from('1')), false)
    eq(R.isEmpty(Float32Array.from('1')), false)
    eq(R.isEmpty(new Float32Array([ 1 ])), false)
  })
  it('returns true for empty object', () => {})
  it('returns true for empty arguments object', () => {
    eq(
      R.isEmpty(
        (function(){
          return arguments
        })()
      ),
      true
    )
    eq(
      R.isEmpty(
        (function(){
          return arguments
        })(0)
      ),
      false
    )
  })
  it('returns false for every other value', () => {
    eq(R.isEmpty(0), false)
    eq(R.isEmpty(NaN), false)
    eq(R.isEmpty([ '' ]), false)
  })
})