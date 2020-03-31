import { trim } from './trim'

test('', () => {
  expect(trim('   foo  bar   baz   ')).toEqual('foo bar baz')
})
