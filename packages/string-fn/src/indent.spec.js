import {indent} from './indent'

test('happy', () => {
  expect(indent('foo\nbar\nbaz', 4)).toEqual('    foo\n    bar\n    baz')
})
