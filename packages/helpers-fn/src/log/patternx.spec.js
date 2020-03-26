const { log } = require('.')

test('', () => {
  console.log('should see pattern logging of 3 variables'.toUpperCase())
  const a = [ 1, 2 ]
  const b = 'foo'
  const c = { a : { b : 1 } }

  log({
    a,
    b,
    c,
  }, 'patternx')
  expect(1).toEqual(1)
})
