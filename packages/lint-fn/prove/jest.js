process.env.LINT_FN_DEBUG = 'ON'
const { lintFn } = require('../')

lintFn({
  filePath : `${ process.env.HOME }/repos/rambdax/src/isValid.spec.js`,
  fixFlag  : true,
  logFlag  : true,
})
