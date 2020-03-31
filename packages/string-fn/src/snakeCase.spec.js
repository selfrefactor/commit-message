import { snakeCase } from './snakeCase'

test('', () => {
  const str = 'foo bar BAZ'
  const result = snakeCase(str)
  const expectedResult = 'foo_bar_baz'

  expect(result).toEqual(expectedResult)
})

test('extra latin', () => {
  const str = 'foo Stören BAZ'
  const result = snakeCase(str, true)
  const expectedResult = 'foo_stören_baz'

  expect(result).toEqual(expectedResult)
})

