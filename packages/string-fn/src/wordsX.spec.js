import { wordsX } from './wordsX'

test('with Bulgarian language', () => {
  const result = wordsX('Имаме неясни надежди, но ясни страхове.')
  const expectedResult = [ 'Имаме', 'неясни', 'надежди', 'но', 'ясни', 'страхове' ]

  expect(result).toEqual(expectedResult)
})

test.skip('in Bulgarian language dash is part of the word', () => {
  const result = wordsX('Имаме по-ясни надежди, но ясни страхове.')
  const expectedResult = [ 'Имаме', 'по-ясни', 'надежди', 'но', 'ясни', 'страхове' ]

  expect(result).toEqual(expectedResult)
})

test('', () => {
  const result = wordsX('fooBarBAZ')
  const expectedResult = [ 'foo', 'Bar', 'BAZ' ]

  expect(result).toEqual(expectedResult)
})

test('doesn\'t work with German', () => {
  const result = wordsX('fooBärBAZ')
  const expectedResult = [ 'foo', 'Bär', 'BAZ' ]

  expect(result).toEqual(expectedResult)
})
