import { isLetter } from './isLetter'

test('happy', () => {
  expect(isLetter('a')).toBeTruthy()
})

test('multiple', () => {
  expect(isLetter('A')).toBeTruthy()
  expect(isLetter('ä')).toBeTruthy()
  expect(isLetter(';')).toBeFalsy()
  expect(isLetter('1')).toBeFalsy()
})
