import { isPunctuation } from './isPunctuation'

test('happy', () => {
  expect(isPunctuation('.')).toBeTruthy()
})

test('multiple', () => {
  expect(isPunctuation(',')).toBeTruthy()
  expect(isPunctuation('`')).toBeTruthy()
  expect(isPunctuation('?')).toBeTruthy()
  expect(isPunctuation('!')).toBeTruthy()
  expect(isPunctuation(';')).toBeTruthy()
  expect(isPunctuation('1')).toBeFalsy()
})

