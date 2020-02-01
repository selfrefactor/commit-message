import { glueRelated } from './glueRelated'

test('', () => {
  const input = [
    'foo',
    'bar',
    'baz',
    'grandeveour',
    'obnoixnousness',
    'when i leave my proven record',
    'loving yourself is hard when you suck',
    "that is precicely the point you don't jump unless",
    'having trouble recreating my dreams',
  ]

  const result = glueRelated(input)
  const expectedResult = [
    "that is precicely the point you don't jump unless; obnoixnousness; foo",
    'loving yourself is hard when you suck; having trouble recreating my dreams',
  ]

  expect(
    result,
  ).toEqual(expectedResult)
})

test('short', () => {
  const input = [
    'foo',
    'bar',
    'baz',
  ]

  const result = glueRelated(input)
  const expected = ['foo; bar; baz','']

  expect(
    result,
  ).toEqual(expected)
})

test('almost empty', () => {
  const input = ['foo']

  const result = glueRelated(input)
  const expected = ['foo','']

  expect(
    result,
  ).toEqual(expected)
})

test('empty', () => {
  const input = []

  const result = glueRelated(input)
  const expected = ['','']

  expect(
    result,
  ).toEqual(expected)
})
