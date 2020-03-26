const { log } = require('.')

test('happy', () => {
  console.log('should see big string'.toUpperCase())

  log('foo may be bar', 'big')
})
