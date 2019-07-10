process.env.NODE_ENV = 'DEBUG'
const { lintFn } = require('../')

lintFn({ 
  filePath : '/home/s/repos/rambda/src/indexBy.spec.js',
  fixFlag: true,
  logFlag: true
})
