process.env.NODE_ENV = 'DEBUG'
const { lintFn } = require('../')

lintFn({ filePath : `${ process.env.HOME }/repos/rambda-docs/src/app/whole/whole.component.ts` })
