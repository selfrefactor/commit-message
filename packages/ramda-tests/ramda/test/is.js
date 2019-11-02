const eq = require('./shared/eq')
const R = require('../../../../..'../../../../../rambda/dist/rambda.js'')

describe('is', () => {
  it('works with built-in types', () => {
    eq(R.is(Array, []), true)
    eq(R.is(Boolean, new Boolean(false)), true)
    eq(R.is(Date, new Date()), true)
    eq(R.is(Function, () => {}), true)
    eq(R.is(Number, new Number(0)), true)
    eq(R.is(Object, {}), true)
    eq(R.is(RegExp, /(?:)/), true)
    eq(R.is(String, new String('')), true)
  })

  it('works with user-defined types', () => {
    function Foo(){}
    function Bar(){}
    Bar.prototype = new Foo()

    const foo = new Foo()
    const bar = new Bar()

    eq(R.is(Foo, foo), true)
    eq(R.is(Bar, bar), true)
    eq(R.is(Foo, bar), true)
    eq(R.is(Bar, foo), false)
  })

  it('considers almost everything an object', () => {
    function Foo(){}
    const foo = new Foo()
    const isObject = R.is(Object)

    eq(isObject(foo), true)
    eq(isObject((function(){ return arguments })()), true)
    eq(isObject([]), true)
    eq(isObject(new Boolean(false)), true)
    eq(isObject(new Date()), true)
    eq(isObject(() => {}), true)
    eq(isObject(new Number(0)), true)
    eq(isObject(/(?:)/), true)
    eq(isObject(new String('')), true)

    eq(isObject(null), false)
    eq(isObject(undefined), false)
  })

  it('does not coerce', () => {
    eq(R.is(Boolean, 1), false)
    eq(R.is(Number, '1'), false)
    eq(R.is(Number, false), false)
  })

  it('recognizes primitives as their object equivalents', () => {
    eq(R.is(Boolean, false), true)
    eq(R.is(Number, 0), true)
    eq(R.is(String, ''), true)
  })

  it('does not consider primitives to be instances of Object', () => {
    eq(R.is(Object, false), false)
    eq(R.is(Object, 0), false)
    eq(R.is(Object, ''), false)
  })

})
