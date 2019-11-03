const eq = require('./shared/eq')
const R = require('../../../../../rambda/dist/rambda.js')

describe('propOr', () => {
  const fred = {
    name : 'Fred',
    age  : 23,
  }
  const anon = { age : 99 }

  const nm = R.propOr('Unknown', 'name')

  it('returns a function that fetches the appropriate property', () => {
    eq(typeof nm, 'function')
    eq(nm(fred), 'Fred')
  })

  it('returns the default value when the property does not exist', () => {
    eq(nm(anon), 'Unknown')
  })

  it('returns the default value when the object is nil', () => {
    eq(nm(null), 'Unknown')
    eq(nm(void 0), 'Unknown')
  })

  it('uses the default when supplied an object with a nil value', () => {
    eq(R.propOr('foo', 'x', { x : null }), 'foo')
    eq(R.propOr('foo', 'x', { x : undefined }), 'foo')
  })
})
