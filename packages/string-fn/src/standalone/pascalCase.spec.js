import { pascalCase } from './pascalCase'

const expectedResult = 'FooBarBaz'

test('happy', () => {
  expect(pascalCase('foo BarBAZ')).toEqual(expectedResult)
})

test('from camel case', () => {
  expect(pascalCase('fooBarBaz')).toEqual(expectedResult)
})

test('from dot case', () => {
  expect(pascalCase('foo.bar.baz')).toEqual(expectedResult)
})
