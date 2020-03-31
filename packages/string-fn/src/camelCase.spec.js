import { camelCase } from './camelCase'

test('happy', () => {
  expect(camelCase('foo bar BAZ')).toEqual('fooBarBaz')
  expect(camelCase('foo-bar-baz')).toEqual('fooBarBaz')
  expect(camelCase('foo-bar-baz')).toEqual('fooBarBaz')
})

test('should work as camelcase library', () => {
  expect(camelCase('Foo-Bar')).toEqual('fooBar')
  expect(camelCase('--foo.bar')).toEqual('fooBar')
  expect(camelCase('Foo-Bar')).toEqual('fooBar')
})

test('extra latin', () => {
  expect(camelCase('foo-Stören.bar', true)).toEqual('fooStörenBar')
})
