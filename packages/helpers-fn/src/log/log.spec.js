const { log } = require('./log')

let logSpy

beforeEach(() => {
  logSpy = jest.spyOn(global.console, 'log')
})
afterEach(() => {
  logSpy.mockRestore()
})

const str = 'FOO bar'

test('separators', () => {
  log('separator')
  log('separatorx')
  expect(logSpy.mock.calls).toMatchSnapshot()
})

test('obj', () => {
  log({
    a : 1,
    b : [ 1, 2 ],
  },
  'obj')
  expect(logSpy.mock.calls[ 0 ]).toMatchSnapshot()
})

test('obj - when input is not an object', () => {
  log(str, 'obj')
  expect(logSpy.mock.calls[ 0 ]).toMatchSnapshot()
})

test('box', () => {
  log(str, 'box')
  expect(logSpy.mock.calls[ 0 ]).toMatchSnapshot()
})

test('with wrong mode', () => {
  expect(() => log(str, 'not exist')).toThrow()
})

test('with too many inputs', () => {
  const expectedSpyCalls = [
    1,
    2,
    3,
    'helpers-fn.log doesn\'t support multiple inputs',
  ]
  log(
    1, 2, 3
  )
  expect(logSpy.mock.calls[ 0 ]).toEqual(expectedSpyCalls)
})
