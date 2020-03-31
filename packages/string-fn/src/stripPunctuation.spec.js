import { stripPunctuation } from './stripPunctuation'

test('', () => {
  const str = 'If my, wings should, fail me ...'
  const result = stripPunctuation(str)
  const expectedResult = 'If my wings should fail me '

  expect(result).toEqual(expectedResult)
})
