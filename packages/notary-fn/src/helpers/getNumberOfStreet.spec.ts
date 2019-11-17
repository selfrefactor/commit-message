import { getNumberOfStreet } from './getNumberOfStreet'

test('', () => {
  const address = 'гр. Свищов, п.к. 5250, ул. "Трети март" № 105'
  const result = getNumberOfStreet(address)
  const expectedResult = 105

  expect(
    result,
  ).toEqual(expectedResult)
})
 
test('when not a number', () => {
  const address = 'гр. Свищов, п.к. 5250, ул. "Трети март" № 105-Б'
  const result = getNumberOfStreet(address)
  const expectedResult = '105-Б'

  expect(
    result,
  ).toEqual(expectedResult)
})
