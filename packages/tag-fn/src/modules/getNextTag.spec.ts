import {getNextTag} from './getNextTag'

test('happy', () => {
  const result = getNextTag('1.2.3', 'minor', true)
  console.log({result})
  expect(result).toBe('1.3.0')
})
