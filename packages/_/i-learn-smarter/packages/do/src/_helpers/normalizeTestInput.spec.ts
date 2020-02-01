import { normalizeTestInput } from './normalizeTestInput'

test('when actual object', () => {
  const result = normalizeTestInput({ a: '', b: null, c: true })
  const expectedResult = '{\"a\":\"\",\"b\":null,\"c\":true}'

  expect(
    result,
  ).toEqual(expectedResult)
})

test('with null', () => {
  const result = normalizeTestInput({ a: null, b: undefined })
  const expectedResult = 'null, undefined'

  expect(
    result,
  ).toEqual(expectedResult)
})

test('with object', () => {
  const result = normalizeTestInput({ a: 'foo', b: { c: 1 } })
  const expectedResult = 'foo, {\"c\":1}'

  expect(
    result,
  ).toEqual(expectedResult)
})

test('with array', () => {
  const result = normalizeTestInput({ a: 1, b: [12, null, ''] })
  const expectedResult = '1, [12,null,""]'

  expect(
    result,
  ).toEqual(expectedResult)
})
