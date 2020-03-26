const { log } = require('.')
const R = require('rambdax')

test('', () => {
  console.log('Last argument is swallowed if it is a string'.toUpperCase())
  log('second string is hidden', 'bar')
  log('bar', [ 1, 2, 3 ], { a : { b : 7 } }, 7, /\s/g)
  log('bar', [ 1, 2, 3 ])
  log('bar', [ 1, 2, 3 ])
  log('bar', [ 1, 2, 3 ])
  log([ 1, 2, 3 ], 1, 8, { a : 1 }, false, true)
  log({ a : 1 })
})

test('empty string as mode', () => {
  log('Featyre is useless', '')
  log('Featyre is useless', '')
  log('Featyre is useless', '')
  log('Featyre is useless', '')
  log('Featyre is useless', '')
})
