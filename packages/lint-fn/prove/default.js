process.env.SKIP_ESLINT_RULES = 'no-nested-ternary,max-len'
const { lintFn } = require('../')

lintFn({
  filePath     : `${ process.env.HOME }/repos/rambda/src/clone.js`,
  fixFlag      : true,
  prettierFlag : true,
  logFlag      : true,
}).then(console.log)
