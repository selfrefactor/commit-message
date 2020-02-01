import { getConvertedNamespace } from './getConvertedNamespace'

test('',async () => {
  const imageURL = 'https://some23432.com/a/bb/ccc/dddd/foo.png'
  const result = await getConvertedNamespace(imageURL)
  const expectedResult = 'some23432_foo.png'

  expect(result).toEqual(expectedResult)
})
