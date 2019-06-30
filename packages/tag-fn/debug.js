const {tagFn} = require('./dist/index')

tagFn({tag: undefined})
  .then(console.log)
  .catch(console.log)
