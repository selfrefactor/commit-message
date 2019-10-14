const eq = require('./shared/eq')
const R = require('rambda')

describe('prop', () => {
  const fred = {
    name : 'Fred',
    age  : 23,
  }

  it('returns a function that fetches the appropriate property', () => {
    const nm = R.prop('name')
    eq(typeof nm, 'function')
    eq(nm(fred), 'Fred')
  })

  it('shows the same behaviour as path for an undefined object', () => {
    let pathException, pathResult, propException, propResult
    try {
      propResult = R.prop('name', undefined)
    } catch (e){
      propException = e
    }

    try {
      pathResult = R.path([ 'name' ], undefined)
    } catch (e){
      pathException = e
    }

    eq(propResult, pathResult)
    eq(propException, pathException)
  })
})
