jasmine.DEFAULT_TIMEOUT_INTERVAL = 3*60*1000
const {isValid} = require('rambdax')

expect.extend({
  is(received, argument) {
    const pass = isLib.is({input: received, schema:argument});
    const message = `expected ${received} to have schema '${argument}'`

    if (pass) {
      return {
        message: () => message,
        pass: true,
      };
    } else {
      return {
        message: () => message,
        pass: false,
      };
    }
  }
})
