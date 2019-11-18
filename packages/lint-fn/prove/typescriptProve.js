process.env.NODE_ENV = 'DEBUG'
const { lintFn } = require('../')

lintFn({
  prettierFlag : true,
  filePath     : `${ process.env.HOME }/repos/services/packages/tag-fn/src/index.ts`,
})
