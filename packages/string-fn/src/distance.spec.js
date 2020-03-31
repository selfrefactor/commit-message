import { distance } from './distance'

test('happy', () => {
  expect(distance('foobarbaz', 'ffoobarbaz')).toEqual(1)

  expect(distance('foobarbaz', 'foo')).toEqual(6)
  expect(distance('foo', 'foo')).toEqual(0)
})

test('with German word', () => {
  expect(distance('schönefeld', 'schönefeld')).toEqual(0)
  expect(distance('schönefeld', 'schonefeld')).toEqual(1)
  expect(distance('schönefeld', 'schönefel')).toEqual(1)
})

test('with Bulgarian sentence', () => {
  const x = 'Имаме неясни надежди, но ясни страхове.'
  const y = 'Имам неясни надежди, но ясни страхове.'
  expect(distance(x, y)).toEqual(1)
})

test('oneo of inputs has zero length', () => {
  expect(
    distance('foo', '')
  ).toEqual(3)

  expect(
    distance('', 'foo')
  ).toEqual(3)
})
