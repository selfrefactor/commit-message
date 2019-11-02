const R = require('../../../../..'../../../../../rambda/dist/rambda.js'')
// var R = require('../../../../..'../../../../../rambda/dist/rambda.js'');
const eq = require('./shared/eq')
const jsv = require('jsverify')

describe('add', () => {
  it('adds together two numbers', () => {
    eq(R.add(3, 7), 10)
  })

  it('coerces its arguments to numbers', () => {
    eq(R.add('1', '2'), 3)
    eq(R.add(1, '2'), 3)
    eq(R.add(true, false), 1)
    eq(R.add(null, null), 0)
    eq(R.add(undefined, undefined), NaN)
    eq(R.add(new Date(1), new Date(2)), 3)
  })

})

describe('add properties', () => {
  jsv.property('commutative', jsv.number, jsv.number, (a, b) => R.add(a, b) === R.add(b, a))

  jsv.property('associative', jsv.number, jsv.number, jsv.number, (a, b, c) => R.add(a, R.add(b, c)) === R.add(R.add(a, b), c))

  jsv.property('identity', jsv.number, a => R.add(a, 0) === a && R.add(0, a) === a)
})
