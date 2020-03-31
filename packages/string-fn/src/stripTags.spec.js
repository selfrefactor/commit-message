import { stripTags } from './stripTags'

test('', () => {
  const str = '<p>foo <b>bar</b>   <hr/> baz</p>'

  const result = stripTags(str)
  const expectedResult = 'foo bar baz'

  expect(result).toEqual(expectedResult)
})

