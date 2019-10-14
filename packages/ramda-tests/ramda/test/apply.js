const eq = require('./shared/eq')
const R = require('rambda')

describe('apply', () => {
  it('applies function to argument list', () => {
    eq(R.apply(Math.max, [ 1, 2, 3, -99, 42, 6, 7 ]), 42)
  })

  it('provides no way to specify context', () => {
    var obj = { method : function(){ return this === obj } }
    eq(R.apply(obj.method, []), false)
    eq(R.apply(R.bind(obj.method, obj), []), true)
  })

})
