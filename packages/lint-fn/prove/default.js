process.env.NODE_ENV = 'DEBUG'
const { lintFn } = require('../')

lintFn({ 
  filePath : '/home/s/repos/niketa-client/src/fileSaved.js',
  fixFlag: true,
  prettierFlag: true,
  logFlag: true
}).then(console.log)
