import { msToText } from './msToText'

test('seconds', () => {
  expect(msToText(18000)).toBe('18 seconds')
})

test('hours', () => {
  expect(msToText(3600000)).toBe('1 hours')
  expect(msToText(4000000)).toBe('1.1 hours')
})

test('days', () => {
  expect(msToText(600000000)).toBe('166.7 hours')
  expect(msToText(700000000)).toBe('8.1 days')
})
