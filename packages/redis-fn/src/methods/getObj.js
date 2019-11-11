const getObj = (redisClient, key) => new Promise((resolve, reject) => {
  redisClient.get(key, (err, result) => {
    if (!(err === null)) {
      return reject(err)
    }
    if (result === null) {
      return resolve(null)
    }
    let parsedResult

    try {
      parsedResult = JSON.parse(result)
    } catch (err) {
      return reject(err)
    }
    resolve(parsedResult)
  })
})

module.exports = getObj
