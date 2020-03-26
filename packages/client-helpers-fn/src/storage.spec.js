const {
  getter,
  getterAnt,
  getterAntReset,
  initLocalState,
  masterGetter,
  masterReset,
  push,
  pushUniq,
  resetter,
  setter,
} = require('./storage')

const MASTER_KEY = 'SK'
const KEY = 'FOO_KEY'

beforeEach(() => {
  initLocalState(MASTER_KEY)
})

afterEach(() => {
  masterReset(MASTER_KEY)
})

test('getterAntReset', () => {
  setter('a', 1)
  setter('b', true)
  setter('c', [ 2, 3 ])
  setter('d', { f : 4 })
  const expected = {
    a : 1,
    b : true,
    c : [ 2, 3 ],
    d : { f : 4 },
  }
  expect(
    masterGetter()
  ).toEqual(expected)

  const hash = {
    a : 77,
    f : 'foo',
  }

  const result = getterAntReset(hash)
  expect(
    result
  ).toEqual(hash)

  expect(
    masterGetter()
  ).toEqual({
    a : 77,
    b : true,
    c : [ 2, 3 ],
    d : { f : 4 },
    f : 'foo',
  })
})

test('getterAnt', () => {
  setter('a', 1)
  setter('b', true)
  setter('c', [ 2, 3 ])
  setter('d', { f : 4 })
  const hash = {
    a : 77,
    f : 'foo',
  }
  const result = getterAnt(hash)
  expect(
    result,
  ).toEqual({
    a : 1,
    f : 'foo',
  })
})

test('with string', () => {
  const value = 'bar'
  setter(KEY, value)

  expect(
    getter(KEY)
  ).toBe(value)
})

test('with boolean', () => {
  const value = true
  setter(KEY, value)

  expect(
    getter(KEY)
  ).toBe(value)
})

test('with object', () => {
  const value = { a : 1 }
  setter(KEY, value)

  expect(
    getter(KEY)
  ).toEqual({ a : 1 })
})

test('return all the holder + resetter', () => {
  const ant = `${ KEY }_${ KEY }`
  setter(KEY, { a : 1 })
  setter(ant, 'foo')

  expect(
    masterGetter()
  ).toEqual({
    [ ant ] : 'foo',
    [ KEY ] : { a : 1 },
  })

  resetter([ ant ])
  expect(
    masterGetter()
  ).toEqual({ [ KEY ] : { a : 1 } })
})

test('returns undefined when key is not in state', () => {
  const value = true
  setter(KEY, value)

  expect(
    getter('somekey')
  ).toBeUndefined()
})

test('after reset it returns empty object', () => {
  expect(
    masterGetter(MASTER_KEY)
  ).toEqual({})
})

test('push initialize array automatically', () => {
  push(KEY, 1)
  push(KEY, 2)

  expect(
    getter(KEY)
  ).toEqual([ 1, 2 ])
})

test('push uniq', () => {
  pushUniq(KEY, 1)
  pushUniq(KEY, 1)
  pushUniq(KEY, 1)

  expect(
    getter(KEY)
  ).toEqual([ 1 ])
})

test('prevent second initialization', () => {
  expect(
    initLocalState(MASTER_KEY)
  ).toBeUndefined()
})
