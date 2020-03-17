const {envFn} = require('./envFn')

// SPECIAL
// ============================================
const envs = envFn('special')


//  LOCAL WITH CWD
// ============================================
// const envs = envFn('local', `${__dirname}/test_folder`)


// RESULTS
// ============================================
console.log('=============')
console.log({envs})
console.log('=============')
console.log({
  redis: process.env.REDIS_URL,
  foo: process.env.foo,
})