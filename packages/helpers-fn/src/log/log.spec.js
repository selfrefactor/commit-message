const { log } = require('./log')

let logSpy

beforeEach(() => {
  logSpy = jest.spyOn(global.console, 'log')
})
afterEach(() => {
  logSpy.mockRestore()
})

test('with too many inputs', () => {
  const expectedSpyCalls = [ 1, 2, 3, "helpers-fn.log doesn't support multiple inputs" ]
  log(1, 2, 3)
  expect(logSpy.mock.calls[0]).toEqual(expectedSpyCalls)
})
