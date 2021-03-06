require('env-fn')('special')
const R = require('rambdax')
const { redisFn } = require('../src/redis-fn')
const KEY = 'dejan'
const VALUE = 'toteff'

const delay = ms =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve()
    }, ms)
  })

const fn = async () => {
  const redis = await redisFn()
  redis.set({
    key   : KEY,
    value : VALUE,
  })

  console.log(await redis.get(KEY))
  process.exit(0)
}

fn()
