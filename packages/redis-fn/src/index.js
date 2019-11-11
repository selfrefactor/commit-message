const R = require('rambda')
const redisLib = require('redis')

const get = require('./methods/get')
const getObj = require('./methods/getObj')
const remove = require('./methods/remove')
const set = require('./methods/set')
const updateObj = require('./methods/updateObj')

const redisFn = optionsRaw => new Promise(resolve => {
  const options = R.defaultTo({}, optionsRaw)
  const defaultExpiryValue = R.defaultTo(24 * 60 * 60, options.defaultExpiryValue)
  const defaultExpiryFlag = R.defaultTo(false, options.defaultExpiryFlag)
  const redisUrl = R.defaultTo(process.env.REDIS_URL, options.redisUrl)

  const redisClient = redisLib.createClient({
    url            : redisUrl,
    retry_strategy : function (retryOptions) {
      if (retryOptions.error && retryOptions.error.code === 'ECONNREFUSED') {
        throw Error('The server refused the connection')
      }
      if (retryOptions.total_retry_time > 1000 * 60 * 60) {
        throw new Error('Retry time exhausted')
      }
      if (retryOptions.times_connected > 10) {
        throw new Error('Redis error - times_connected is greater than 10')
      }

      return Math.min(options.attempt * 100, 3000)
    },
  })

  redisClient.on('connect', () => {
    const getCurried = R.curry(get)
    const getObjCurried = R.curry(getObj)
    const removeCurried = R.curry(remove)

    resolve({
      client : redisClient,
      get    : getCurried(redisClient),
      getObj : getObjCurried(redisClient),
      remove : removeCurried(redisClient),
      set    : R.partialCurry(set, {
        redisClient,
        defaultExpiryFlag,
        defaultExpiryValue,
      }),
      updateObj : R.partialCurry(updateObj, {
        redisClient,
        defaultExpiryFlag,
        defaultExpiryValue,
      }),
    })
  })
})

exports.redisFn = redisFn
