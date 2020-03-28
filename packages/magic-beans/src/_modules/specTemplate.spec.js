const { specTemplate } = require('./specTemplate')

test('happy', () => {
  specTemplate({
    asyncFlag  : false,
    fileName   : 'foo',
    methodName : 'far',
  })
})
