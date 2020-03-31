import { dotCase } from './dotCase'

test('happy', () => {
  const result = dotCase('foo bar BAZ')
  const expected = 'foo.bar.baz'

  expect(
    result
  ).toEqual(expected)
})

test('extra latin', () => {
  const result = dotCase('foo Stören BAZ', true)
  const expected = 'foo.stören.baz'

  expect(
    result
  ).toEqual(expected)
})
