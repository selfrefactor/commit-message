import { normalize } from './normalize'
import { type } from 'rambdax'

test('', () => {
  const word = 'повече'
const input = [ 'повече, още, по-, вече, отново, по-скоро',
'вече, повече',
'повече',
'повече, по-добре, по-хубаво',
'повече',
'отново, пак, още веднъж, повече, наново, пък',
'повече' ]

  const result = normalize(word, input)
  expect(
    type(result)
  ).toBe('Array')
  expect(
    type(result[0])
  ).toBe('String')
})