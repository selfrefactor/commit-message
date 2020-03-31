import { dotCase } from './dotCase'

const expectedResult = 'foo.bar.baz'
test('happy', () => {
  expect(dotCase('foo BarBAZ')).toEqual(expectedResult)
})

test('from camel case', () => {
  expect(dotCase('fooBarBaz')).toEqual(expectedResult)
})

test('from dot case', () => {
  expect(dotCase('foo.bar.baz')).toEqual(expectedResult)
})
