import { words } from './words'

test('', () => {
  const result = words('fooBarBAZ')
  const expectedResult = [ 'foo', 'Bar', 'BAZ' ]

  expect(result).toEqual(expectedResult)
})

test('doesn\'t work with German', () => {
  const result = words('fooBärBAZ')
  const expectedResult = [ 'foo', 'B', 'r', 'BAZ' ]

  expect(result).toEqual(expectedResult)
})
