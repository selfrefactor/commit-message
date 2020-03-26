const { log } = require('.')

test('', () => {
  console.log('should see exact icon 3 times'.toUpperCase())
  log('foo', 'icon.tag=11')
  log('bar', 'icon.tag=11')
  log('baz', 'icon.tag=11')
  expect(1).toEqual(1)
})

test('', () => {
  console.log('should see different icons 3 times'.toUpperCase())
  log('foo', 'icon')
  log('bar', 'icon')
  log('baz', 'icon')
  expect(1).toEqual(1)
})
