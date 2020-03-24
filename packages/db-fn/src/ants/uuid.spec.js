const { uuidAnt } = require('./uuid')

test('', () => {
  expect(() => console.log(uuidAnt())).not.toThrow()
})
