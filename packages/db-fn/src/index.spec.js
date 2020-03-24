const { readFileSync, unlinkSync } = require('fs')

const {
  init,
  load,
  loadAll,
  loadJson,
  loadKeys,
  push,
  remove,
  save,
  update,
} = require('./') 

init('/home/s/repos/data/tmp')

test('happy', async () => {
  const { location } = await save(
    { b : 2 }, 'foo', 'bar'
  )
  readFileSync(location).toString()
  const loaded = await loadJson('foo', 'bar')
  expect(loaded).toEqual({ b : 2 })
  unlinkSync(location)
})

test('save with one label', async () => {
  const saved = await save({ b : 2 }, 'foo')
  const content = readFileSync(saved.location).toString()
  console.log(saved, content)
  unlinkSync(saved.location)
})

test('save with two labels', async () => {
  const saved = await save(
    { b : 2 }, 'foo', 'bar'
  )
  console.log(saved)

  expect(await remove('foo', 'bar')).toBe(true)
})

test('push', async () => {
  const { location, newState } = await push({ a : 1 }, 'bar')
  console.log(newState, location)
  unlinkSync(location)
  try {
  } catch (e){}
})

test('load keys', async () => {
  init('/home/s/repos/data')
  const result = await loadKeys('word_profile')
  console.log({ result })
})

test('load all', async () => {
  const firstLocation = await save(
    { a : 1 }, 'foo', 'bar'
  )
  const secondLocation = await save(
    { a : 20 }, 'foo', 'baz'
  )
  const result = await loadAll('foo')
  expect(result).toEqual([ { a : 1 }, { a : 20 } ])
  unlinkSync(firstLocation.location)
  unlinkSync(secondLocation.location)
})

test('load with id and label', async () => {
  const firstPush = await push({ a : 1 }, 'foo')
  const secondPush = await push({ a : 20 }, 'foo')
  expect(secondPush.newState.length).toBe(2)

  const loaded = await load(firstPush.id, 'foo')
  expect(loaded).toEqual(firstPush.newState[ 0 ])
  unlinkSync(firstPush.location)
})

test('update', async () => {
  const firstPush = await push({ a : 1 }, 'foo')
  await push({ a : 20 }, 'foo')
  const loaded = await load(firstPush.id, 'foo')

  const updated = await update({
    ...loaded,
    a : 40,
  },
  'foo')
  const afterUpdate = await load(firstPush.id, 'foo')
  expect(updated.length).toBe(2)
  expect(afterUpdate.a).toBe(40)

  unlinkSync(firstPush.location)
})

test('save', () => {
  expect(typeof save).toBe('function')
})

test('save', () => {
  expect(typeof save).toBe('function')
})
