import { removeIndent } from './removeIndent'

test('', () => {
  const result = removeIndent('    foo\n    bar\n    baz')
  const expectedResult = 'foo\nbar\nbaz'

  expect(result).toEqual(expectedResult)
})

