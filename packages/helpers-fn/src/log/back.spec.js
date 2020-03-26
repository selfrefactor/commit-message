const { log } = require('.')

test('', () => {
  console.log('Log with background'.toUpperCase())
  log('bar', [ 1, 2, 3 ], 'back')
  log('bar', [ 1, 2, 3 ], 'back')

  expect(1).toEqual(1)
})
