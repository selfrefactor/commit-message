const { log } = require('.')

test('', () => {
  console.log('should see object logging'.toUpperCase())
  log({ a : { b : 1 } }, 'obj')
  console.log('should see two objects logging'.toUpperCase())
  log({ a : 1 }, { b : [ 1, 2, 3 ] }, 'obj')
  expect(1).toEqual(1)
})
