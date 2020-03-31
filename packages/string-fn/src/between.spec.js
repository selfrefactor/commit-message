import { between } from './between'

test('0', () => {

  expect(
    between('2,626/две цяло и шестстотин двадесет и шест/', '/')
  ).toEqual('две цяло и шестстотин двадесет и шест')
})

test('1', () => {
  expect(between('begin foobarbaz end', 'foo', 'baz')).toEqual('bar')
})

test('2', () => {
  expect(between('begin foo   bar   baz end', 'foo', 'baz')).toEqual('bar')
})

test('3', () => {
  expect(between('begin foo bar baz end', 'q', 'x')).toEqual('begin foo bar baz end')
})

const LONG = `
begin foo bar baz end
begin foo bar baz end
begin foo bar baz end
begin foo bar baz end
begin foo bar baz end
begin foo bar baz end
begin foo bar baz
`

const LONG_EXPECTED = `foo bar baz end
begin foo bar baz end
begin foo bar baz end
begin foo bar baz end
begin foo bar baz end
begin foo bar baz`

test('with multiline text', () => {
  expect(between(LONG, 'begin', 'end')).toEqual(LONG_EXPECTED)
})

