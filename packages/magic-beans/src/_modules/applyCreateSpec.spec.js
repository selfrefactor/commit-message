const { applyCreateSpec } = require('./applyCreateSpec')

test('happy', () => {
  const filePath = `${ process.env.HOME }/repos/rambda/source/add.js`
  const result = applyCreateSpec(filePath, 'add')
  console.log(result)
})
