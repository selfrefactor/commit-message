import { constantCase } from './constantCase'

const expectedResult = 'FOO_BAR_BAZ'
test('happy', () => {
  expect(constantCase('foo BarBAZ')).toEqual(expectedResult)
})

test('from camel case', () => {
  expect(constantCase('fooBarBaz')).toEqual(expectedResult)
})

test('from dot case', () => {
  expect(constantCase('foo.bar.baz')).toEqual(expectedResult)
})
