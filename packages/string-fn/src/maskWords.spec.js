import { maskWords } from './maskWords'

test('', () => {
  const result = maskWords({ words : 'James Brown' })
  const expectedResult = 'J___s B___n'

  expect(result).toEqual(expectedResult)
})

test('', () => {
  const result = maskWords({ words : 'Ein Tropfen Liebe ist mehr als ein Ozean an Wille und Verstand' })
  const expectedResult = 'E_n T_____n L___e i_t m__r a_s e_n O___n a_ W___e u_d V______d'

  expect(result).toEqual(expectedResult)
})
