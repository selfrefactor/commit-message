const { log } = require('./log')

let logSpy

beforeEach(() => {
  logSpy = jest.spyOn(global.console, 'log')
})
afterEach(() => {
  logSpy.mockRestore();
})

test('with too many inputs', () => {
  log(1,2,3)
})
