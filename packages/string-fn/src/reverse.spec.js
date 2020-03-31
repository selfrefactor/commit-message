import { reverse } from './reverse'

test('', () => {
  const str = 'fooBarBaz'
  const result = reverse(str)
  const expectedResult = 'zaBraBoof'

  expect(result).toEqual(expectedResult)
  expect(str).toEqual('fooBarBaz')
})

