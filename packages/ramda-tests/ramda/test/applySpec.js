const eq = require('./shared/eq')
const R = require('../../../../../rambda/dist/rambda.js')

describe('applySpec', () => {

  it('works with empty spec', () => {
    eq(R.applySpec({})(), {})
  })

  it('works with unary functions', () => {
    eq(R.applySpec({
      v : R.inc,
      u : R.dec,
    })(1), {
      v : 2,
      u : 0,
    })
  })

  it('works with binary functions', () => {
    eq(R.applySpec({ sum : R.add })(1, 2), { sum : 3 })
  })

  it('works with nested specs', () => {
    eq(R.applySpec({
      unnested : R.always(0),
      nested   : { sum : R.add },
    })(1, 2),
    {
      unnested : 0,
      nested   : { sum : 3 },
    }
    )
  })

  it('works with arrays of nested specs', () => {
    eq(R.applySpec({
      unnested : R.always(0),
      nested   : [ { sum : R.add } ],
    })(1, 2),
    {
      unnested : 0,
      nested   : [ { sum : 3 } ],
    }
    )
  })

  it('works with arrays of spec objects', () => {
    eq(R.applySpec([ { sum : R.add } ])(1, 2),
      [ { sum : 3 } ]
    )
  })

  it('works with arrays of functions', () => {
    eq(R.applySpec([ R.map(R.prop('a')), R.map(R.prop('b')) ])([
      {
        a : 'a1',
        b : 'b1',
      }, {
        a : 'a2',
        b : 'b2',
      },
    ]),
    [ [ 'a1', 'a2' ], [ 'b1', 'b2' ] ])
  })

  it('works with a spec defining a map key', () => {
    eq(R.applySpec({ map : R.prop('a') })({ a : 1 }), { map : 1 })
  })

  it('retains the highest arity', () => {
    const f = R.applySpec({
      f1 : R.nAry(2, R.T),
      f2 : R.nAry(5, R.T),
    })
    eq(f.length, 5)
  })

  it('returns a curried function', () => {
    eq(R.applySpec({ sum : R.add })(1)(2), { sum : 3 })
  })
})
