import { convertNumbers } from './convertNumbers'

test('', () => {
  const input = '65766.702.3834'

  const result = convertNumbers(input)

  const expectedResult = 'шест, пет, седем, шест, шест, точка, седем, нула, две, точка, три, осем, три, четири'

  expect(
    result,
  ).toEqual(expectedResult)
})
