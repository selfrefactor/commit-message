const { readFolders } = require('./readFolders')

test('happy', async () => {
  const files = readFolders('/home/matrix/repos/rambdax')
  console.log(files.length)
})
