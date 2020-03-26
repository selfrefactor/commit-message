const { loadingBar } = require('./loadingBar')

test('', () => {
  const loadingBarFn = loadingBar(4)
  expect(loadingBarFn()).toBe('🀱🀱🀱🀱')
  expect(loadingBarFn()).toBe('🀰🀱🀱🀱')
  expect(loadingBarFn()).toBe('🀰🀰🀱🀱')
  expect(loadingBarFn()).toBe('🀰🀰🀰🀱')
  expect(loadingBarFn()).toBe('🀰🀰🀰🀰')
  expect(loadingBarFn()).toBe('🀱🀱🀱🀱')
})

test('when length is 2', () => {
  const loadingBarFn = loadingBar(2)
  expect(loadingBarFn()).toBe('🀱🀱')
  expect(loadingBarFn()).toBe('🀰🀱')
  expect(loadingBarFn()).toBe('🀰🀰')
  expect(loadingBarFn()).toBe('🀱🀱')
})

test('when length is 1', () => {
  const loadingBarFn = loadingBar(1)
  expect(loadingBarFn()).toBe('🀱')
  expect(loadingBarFn()).toBe('🀰')
  expect(loadingBarFn()).toBe('🀱')
  expect(loadingBarFn()).toBe('🀰')
})
