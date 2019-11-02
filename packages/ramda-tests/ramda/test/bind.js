
const eq = require('./shared/eq')
const R = require('../../../../..'../../../../../rambda/dist/rambda.js'')

describe('bind', () => {

  function Foo(x){
    this.x = x
  }
  function add(x){
    return this.x + x
  }
  function Bar(x, y){
    this.x = x
    this.y = y
  }
  Bar.prototype = new Foo()
  Bar.prototype.getX = function(){
    return 'prototype getX'
  }

  it('returns a function', () => {
    eq(typeof R.bind(add, Foo), 'function')
  })

  it('returns a function bound to the specified context object', () => {
    const f = new Foo(12)
    function isFoo(){
      return this instanceof Foo
    }
    const isFooBound = R.bind(isFoo, f)
    eq(isFoo(), false)
    eq(isFooBound(), true)
  })

  it('works with built-in types', () => {
    const abc = R.bind(String.prototype.toLowerCase, 'ABCDEFG')
    eq(typeof abc, 'function')
    eq(abc(), 'abcdefg')
  })

  it('works with user-defined types', () => {
    const f = new Foo(12)
    function getX(){
      return this.x
    }
    const getXFooBound = R.bind(getX, f)
    eq(getXFooBound(), 12)
  })

  it('works with plain objects', () => {
    const pojso = { x : 100 }
    function incThis(){
      return this.x + 1
    }
    const incPojso = R.bind(incThis, pojso)
    eq(typeof incPojso, 'function')
    eq(incPojso(), 101)
  })

  it('does not interfere with existing object methods', () => {
    const b = new Bar('a', 'b')
    function getX(){
      return this.x
    }
    const getXBarBound = R.bind(getX, b)
    eq(b.getX(), 'prototype getX')
    eq(getXBarBound(), 'a')
  })

  it('preserves arity', () => {
    const f0 = function(){ return 0 }
    const f1 = function(a){ return a }
    const f2 = function(a, b){ return a + b }
    const f3 = function(a, b, c){ return a + b + c }

    eq(R.bind(f0, {}).length, 0)
    eq(R.bind(f1, {}).length, 1)
    eq(R.bind(f2, {}).length, 2)
    eq(R.bind(f3, {}).length, 3)
  })

})
