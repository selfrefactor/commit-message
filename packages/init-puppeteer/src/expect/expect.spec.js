const { expect: expectModule } = require('./expect')

test('happy', () => {
  expect(() => {
    expectModule(
      2, 'greaterThan', 1, 'foo'
    )
  }).not.toThrow()
})
