import { count } from './count'

test('happy', () => {
  expect(count('fooBarfoo', 'foo')).toEqual(2)
  expect(count('fooBarfoo', 'bar')).toEqual(0)
  expect(count('fooBarfoo', 'Bar')).toEqual(1)
})

test('with German word', () => {
  expect(count('schönefeld', 'schön')).toEqual(1)
})

