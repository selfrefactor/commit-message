import { getIndent } from './getIndent.js'

const input = `  it('considers equal Boolean primitives equal', function() {
  `

test('happy', () => {
  expect(getIndent('    foo')).toEqual(4)
  expect(getIndent('foo')).toEqual(0)
})

test('count from beginning', () => {
  expect(getIndent(input)).toBe(2)
})

test('with long empty string', () => {
  expect(getIndent('        ')).toBe(8)
})
