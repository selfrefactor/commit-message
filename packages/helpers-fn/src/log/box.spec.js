const R = require('rambdax')

const { log } = require('.')

test('', () => {
  console.log('should see box around strings'.toUpperCase())

  log(
    R.repeat('foo',20).join(''), 
    'box'
  )
})
