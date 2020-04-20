const { sortPackageJson } = require('./sort-package-json')

test('happy', async () => {
  const result = await sortPackageJson(`${ __dirname }/test-assets/foo.json`, { testing : true })
  console.log(typeof result)
})
