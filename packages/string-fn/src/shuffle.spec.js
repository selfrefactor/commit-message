import { shuffle } from './shuffle'

test('', () => {
  const str = 'fooBarBazIammorethantag'
  const result = shuffle(str)

  expect(result).not.toEqual(str)
  expect(str.length).toEqual(result.length)
})
