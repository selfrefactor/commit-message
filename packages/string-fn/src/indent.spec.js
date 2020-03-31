import {indent} from './indent'

test('', () => {
  expect(indent('foo\nbar\nbaz', 4)).toEqual('    foo\n    bar\n    baz')
})
