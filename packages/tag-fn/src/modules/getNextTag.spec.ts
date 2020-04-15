import {getNextTag} from './getNextTag'

test('happy', () => {
  expect(
    getNextTag('1.2.3', 'minor')
  ).toBe('1.3.0')
})