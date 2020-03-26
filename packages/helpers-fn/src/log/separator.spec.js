const { log } = require('.')

test('', () => {
  console.log('should see 2 separators'.toUpperCase())
  log('separator')
  log('sep')
})

test('', () => {
  console.log('should see 2 fat separators'.toUpperCase())
  log('separatorx')
  log('sepx')
})
