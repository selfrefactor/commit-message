const eq = require('./shared/eq')
const R = require('rambda')

describe('objOf', () => {

  it('creates an object containing a single key:value pair', () => {
    eq(R.objOf('foo', 42), { foo : 42 })
    eq(R.objOf('foo')(42), { foo : 42 })
  })

})
