require('env-fn')('special')
const R = require('rambda')
const { redisFn } = require('../src/')
const KEY = 'dejan'
const VALUE = 'toteff'

const delay = ms => new Promise(resolve => {
  setTimeout(() => {
    resolve()
  }, ms)
})

const fn = async () => {
  const redis = await redisFn()
  redis.set({
    key: KEY,
    value: VALUE
  })

  console.log(await redis.get(KEY))
}

fn()