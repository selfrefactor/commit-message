import { constantCase } from './constantCase'

test('', () => {
  const result = constantCase('fooBarBAZ')
  const expectedResult = 'FOO_BAR_BAZ'

  expect(result).toEqual(expectedResult)
})

test('extra latin', () => {
  const result = constantCase('fooStörenBAZ', true)
  const expectedResult = 'FOO_STÖREN_BAZ'

  expect(result).toEqual(expectedResult)
})
