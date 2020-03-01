const {envFn} = require('./envFn')

envFn('special')
console.log(process.env.REDIS_URL)