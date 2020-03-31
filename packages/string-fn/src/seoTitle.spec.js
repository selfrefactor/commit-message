import { seoTitle } from './seoTitle'

test('', () => {
  const result = seoTitle('in my time |,of dying')
  const expectedResult = 'In my Time of Dying'

  expect(result).toEqual(expectedResult)
})

test('', () => {
  const result = seoTitle('i got ants in my pants', 2)
  const expectedResult = 'I Got Ants In My Pants'

  expect(result).toEqual(expectedResult)
})

