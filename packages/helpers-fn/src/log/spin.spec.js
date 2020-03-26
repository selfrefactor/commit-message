const { log } = require('.')
const R = require('rambdax')

jasmine.DEFAULT_TIMEOUT_INTERVAL = 30000

test('', async () => {
  console.log('Logs spinner for 3 sec and stops'.toUpperCase())
  log('foo', 'spin')
  await R.delay(3500)
  log('stopspin')
  console.log('spinner is stopped')
  await R.delay(1500)
  expect(1).toEqual(1)
})
