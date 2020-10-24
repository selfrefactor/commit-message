const { log } = require('./log')

let logSpy

beforeEach(() => {
  logSpy = jest.spyOn(global.console, 'log')
})
afterEach(() => {
  logSpy.mockRestore()
})

const str = 'FOO bar'

test('separator', () => {
  log('separator')
  // expect(logSpy.mock.calls[ 0 ]).toMatchSnapshot()
})

test('obj', () => {
  log({
    a : 1,
    b : [ 1, 2 ],
  }, 'obj')
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
  const expectedSpyCalls = [
    'FOO bar',
    'not exist',
    'unrecognized helpers-fn.log mode',
  ]
  log(str, 'not exist')
  expect(logSpy.mock.calls[ 0 ]).toEqual(expectedSpyCalls)
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
