import { splitSentence } from './splitSentence'

test('', () => {
  const str = 'in my   , time of-dying, when nobody.'
  const result = splitSentence(str)
  const expectedResult = [
    'in',
    'my',
    ',',
    'time',
    'of',
    '-',
    'dying',
    ',',
    'when',
    'nobody',
    '.',
  ]
  expect(result).toEqual(expectedResult)
})

