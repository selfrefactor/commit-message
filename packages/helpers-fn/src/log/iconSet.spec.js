const { log } = require('.')

test('', () => {
  console.log('should see exact icon 4 icons'.toUpperCase())
  log('info', 'info')
  log('success', 'success')
  log('warning', 'warning')
  log('error', 'error')
  log('error', 'eror')
  expect(1).toEqual(1)
})
