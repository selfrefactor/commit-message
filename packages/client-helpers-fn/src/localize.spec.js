const { setter, getter, type } = require('rambdax')
const {
  getLocalize,
  getTypeless,
  initialGetLocalize,
  normalizeLocalize,
  setLocalize,
} = require('./localize')

let keys = []

beforeEach(() => {
  localStorage = {
    getItem : key => {
      const maybeReturn = getter(key)

      return maybeReturn === undefined ? null : maybeReturn
    },
    setItem : (key, value) => {
      keys.push(key)
      setter(key, value)
    },
  }
})

afterEach(() => {
  keys.forEach(x => {
    setter(x, null)
  })
  keys = []
})

test('happy', () => {
  expect(initialGetLocalize({
    defaultValue : true,
    key          : 'foo',
  })).toBe(true)

  expect(
    getLocalize('foo', 'boolean')
  ).toBe(true)

  expect(initialGetLocalize({
    defaultValue : true,
    key          : 'foo',
  })).toBe(true)
})

test('set.localize number', () => {
  setLocalize('foo', 1)

  expect(
    [ typeof getTypeless('foo'),
      getTypeless('foo') ]
  ).toEqual([
    'number',
    1,
  ])
})

test('set.localize array', () => {
  setLocalize('foo', [ 1, 'bar', { b : { foo : 3 } } ])

  expect(
    [
      getTypeless('foo'),
      Array.isArray(getTypeless('foo')),
    ]
  ).toEqual([
    [ 1, 'bar', { b : { foo : 3 } } ],
    true,
  ])
})

test('set.localize object', () => {
  setLocalize('foo', { b : { foo : 3 } })

  expect(
    [
      getTypeless('foo'),
      type(getTypeless('foo')),
    ]
  ).toEqual([
    { b : { foo : 3 } },
    'Object',
  ])
})

test('set.localize string', () => {
  setLocalize('foo', 'bar')

  expect(
    [
      getTypeless('foo'),
      type(getTypeless('foo')),
    ]
  ).toEqual([
    'bar',
    'String',
  ])
})

test('it resets local storage', () => {
  expect(
    getLocalize('foo')
  ).toBe(null)

  expect(
    getLocalize('foo', 'boolean')
  ).toBe(false)
})

test('force object as return type', () => {
  expect(getLocalize('foo', 'object')).toEqual({})
})

test('force array as return type', () => {
  expect(getLocalize('foo', 'array')).toEqual([])
})

test('default to null when it does not exists', () => {
  expect(getLocalize('foo')).toEqual(null)
})

test('with object', () => {
  expect(initialGetLocalize({
    defaultValue : { a : 1 },
    key          : 'foo',
  })).toEqual({ a : 1 })

  expect(getLocalize('foo', 'object')).toEqual({ a : 1 })
})

test('with bad object', () => {
  expect(initialGetLocalize({
    defaultValue : 'a1:',
    key          : 'foo',
  })).toEqual('a1:')

  expect(getLocalize('foo', 'object')).toEqual({})
})

test('normalize boolean', () => {
  expect(
    normalizeLocalize('false')
  ).toEqual(false)
})

test('normalize number', () => {
  expect(
    normalizeLocalize('11.1')
  ).toEqual(11.1)
})

test('normalize object', () => {
  expect(
    normalizeLocalize('{"a":1}')
  ).toEqual({ a : 1 })
})

test('normalize array', () => {
  expect(
    normalizeLocalize('[1,2,{"a":3,"b":true},"bar"]')
  ).toEqual([ 1, 2, {
    a : 3,
    b : true,
  }, 'bar' ])
})

test('force normalize as array', () => {
  expect(
    normalizeLocalize('ar"]', 'array')
  ).toEqual([])
})

test('normzlize with wrong object-like string', () => {
  expect(
    normalizeLocalize('{"a":1', 'object')
  ).toEqual({})
})

test('normalizeLocalize nested objects', () => {
  expect(
    normalizeLocalize('{"a":"true", "b":{"c":"11.1"}}', 'object')
  ).toEqual({
    a : true,
    b : { c : 11.1 },
  })
})
