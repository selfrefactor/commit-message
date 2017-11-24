import { length } from 'rambdax'

test('', () => {
  const result = length([1, 2, 3])
  const expected = 3

  expect(
    result,
  ).toEqual(expected)
})
