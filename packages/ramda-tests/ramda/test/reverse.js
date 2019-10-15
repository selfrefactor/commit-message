const eq = require('./shared/eq')
const R = require('../../../../../rambda/dist/rambda')

describe('reverse', () => {

  it('reverses arrays', () => {
    eq(R.reverse([]), [])
    eq(R.reverse([ 1 ]), [ 1 ])
    eq(R.reverse([ 1, 2 ]), [ 2, 1 ])
    eq(R.reverse([ 1, 2, 3 ]), [ 3, 2, 1 ])
  })

  it('reverses strings', () => {
    eq(R.reverse(''), '')
    eq(R.reverse('a'), 'a')
    eq(R.reverse('ab'), 'ba')
    eq(R.reverse('abc'), 'cba')
  })

})
