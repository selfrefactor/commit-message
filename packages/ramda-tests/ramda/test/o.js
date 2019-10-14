const jsv = require('jsverify')

const eq = require('./shared/eq')
const R = require('rambda')

describe('o', () => {

  it('is not a variadic function', () => {
    eq(typeof R.o, 'function')
    eq(R.o.length, 3)
  })

  it('is a curried function', () => {
    eq(R.o(R.add(1), R.multiply(2), 10), R.o(R.add(1))(R.multiply(2))(10))
  })

  it('performs right-to-left function composition', () => {
    //  f :: Number -> ([Number] -> [Number])
    const f = R.o(R.map, R.multiply)

    eq(f.length, 1)
    eq(f(10)([ 1, 2, 3 ]), [ 10, 20, 30 ])
  })

  describe('o properties', () => {

    jsv.property('composes two functions', jsv.fn(), jsv.fn(), jsv.nat, (f, g, x) => R.equals(R.o(f, g)(x), f(g(x))))

    jsv.property('associative', jsv.fn(), jsv.fn(), jsv.fn(), jsv.nat, (f, g, h, x) => {
      const result = f(g(h(x)))
      const fg = R.o(f, g)
      const gh = R.o(g, h)

      return R.all(R.equals(result), [
        R.o(f, gh, x),
        R.o(fg, h, x),
        R.o(f, gh)(x),
        R.o(fg, h)(x),
      ])
    })
  })
})
