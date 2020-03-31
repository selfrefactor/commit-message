import { pascalCase } from './pascalCase'

test('', () => {
  const result = pascalCase('foo bar BAZ')
  const expected = 'FooBarBaz'

  expect(
    result
  ).toEqual(expected)
})

test('extra latin', () => {
  const result = pascalCase('foo Stören BAZ', true)
  const expected = 'FooStörenBaz'

  expect(
    result
  ).toEqual(expected)
})

