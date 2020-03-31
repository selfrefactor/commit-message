import { titleCase } from './titleCase'

test('', () => {
  const str = 'foo bar BAZ'
  const result = titleCase(str)
  const expectedResult = 'Foo Bar Baz'

  expect(result).toEqual(expectedResult)
})

test('', () => {
  const str = 'fooBar_BAZ'
  const result = titleCase(str)
  const expectedResult = 'Foo Bar Baz'

  expect(result).toEqual(expectedResult)
})

test('extra latin', () => {
  const str = 'fooStören_BAZ'
  const result = titleCase(str, true)
  const expectedResult = 'Foo Stören Baz'

  expect(result).toEqual(expectedResult)
})
