process.env.LINT_FN_DEBUG = 'ON'
const { lintFn } = require('../')

lintFn({
  filePath     : `${ process.env.HOME }/repos/data/niketa_demo/component.js`,
  fixFlag      : true,
  prettierFlag : true,
  logFlag      : true,
})
