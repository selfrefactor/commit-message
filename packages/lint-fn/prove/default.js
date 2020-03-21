process.env.LINT_FN_DEBUG = 'ON'
process.env.SKIP_ESLINT_RULES = 'no-nested-ternary,max-len'
const { lintFn } = require('../')

lintFn({
  filePath     : `${ process.env.HOME }/repos/rambda/source/add.js`,
  fixFlag      : true,
  prettierFlag : true,
  logFlag      : true,
}).then(console.log)
