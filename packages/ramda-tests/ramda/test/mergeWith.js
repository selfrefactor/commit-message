const assert = require('assert')

const eq = require('./shared/eq')
const R = require('rambda')

describe('mergeWith', () => {
  function last(x, y){ return y }

  it('takes two objects, merges their own properties and returns a new object', () => {
    const a = {
      w : 1,
      x : 2,
    }
    const b = {
      y : 3,
      z : 4,
    }
    eq(R.mergeWith(last, a, b), {
      w : 1,
      x : 2,
      y : 3,
      z : 4,
    })
  })

  it('applies the provided function to the value from the first object and the' +
    ' value from the second object to determine the value for keys that exist in' +
    ' both objects', () => {
    const a = {
      x : 'a',
      y : 'c',
    }
    const b = {
      x : 'b',
      z : 'd',
    }
    const c = R.mergeWith((a, b) => a + b, a, b)
    eq(c, {
      x : 'ab',
      y : 'c',
      z : 'd',
    })
  })

  it('is not destructive', () => {
    const a = {
      w : 1,
      x : 2,
    }
    const res = R.mergeWith(last, a, { x : 5 })
    assert.notStrictEqual(a, res)
    eq(res, {
      w : 1,
      x : 5,
    })
  })

  it('reports only own properties', () => {
    function Cla(){}
    Cla.prototype.x = 5
    eq(R.mergeWith(last, new Cla(), {
      w : 1,
      x : 2,
    }), {
      w : 1,
      x : 2,
    })
    eq(R.mergeWith(last, {
      w : 1,
      x : 2,
    }, new Cla()), {
      w : 1,
      x : 2,
    })
    eq(R.mergeWith(last, new Cla(), { w : 1 }), { w : 1 })
  })

})
