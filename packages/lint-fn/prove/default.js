process.env.NODE_ENV = 'DEBUG'
const { lintFn } = require('../')

lintFn({
  filePath     : `${ process.env.HOME }/repos/rambda/src/zip.js`,
  fixFlag      : true,
  prettierFlag : true,
  logFlag      : true,
}).then(console.log)
