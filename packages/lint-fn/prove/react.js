process.env.NODE_ENV = 'DEBUG'
const { lintFn } = require('../')

lintFn({ 
  filePath : '/home/s/repos/data/niketa_demo/component.js',
  fixFlag: true,
  prettierFlag: true,
  logFlag: true
})
