const R = require('rambdax')

const updateObj = ({
  redisClient,
  key,
  value,
  expiryFlag,
  expiryValue,
  defaultExpiryFlag,
  defaultExpiryValue,
}) =>
  new Promise((resolve, reject) => {
    redisClient.get(key, (err, result) => {
      if (!(err === null)){
        return reject(err)
      }
      if (result === null){
        return resolve(false)
      }
      let parsedResult

      try {
        parsedResult = JSON.parse(result)
      } catch (err){
        return resolve(false)
      }
      const objToSet = R.merge(parsedResult, value)

      if (expiryFlag === true || defaultExpiryFlag === true){
        const expiryPeriod = R.defaultTo(defaultExpiryValue, expiryValue)

        redisClient.set(
          key, JSON.stringify(objToSet), 'EX', expiryPeriod
        )
      } else {
        redisClient.set(key, JSON.stringify(objToSet))
      }
      resolve(objToSet)
    })
  })

module.exports = updateObj
