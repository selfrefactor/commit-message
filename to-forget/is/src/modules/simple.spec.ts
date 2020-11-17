import { simple } from './simple'

test('', () => {
  expect(
    simple(['foo', 'bar'], 'array'),
  ).toBeTruthy()
})

test('', () => {
  expect(
    simple(['foo', 'bar'], 'string'),
  ).toBeFalsy()
})

test('', () => {
  expect(
    simple([], 'array'),
  ).toBeFalsy()

  expect(
    simple('', 'string'),
  ).toBeFalsy()
})

test('', () => {
  expect(
    simple(true, 'boolean'),
  ).toBeTruthy()
})
