import { camelCase } from './camelCase'

const expectedResult = 'fooBarBaz'
test('happy', () => {
  expect(camelCase('foo BarBAZ')).toEqual(expectedResult)
})

test('from camel case', () => {
  expect(camelCase('fooBarBaz')).toEqual(expectedResult)
})

test('from dot case', () => {
  expect(camelCase('foo.bar.baz')).toEqual(expectedResult)
})
