const get = (redisClient, key) =>
  new Promise((resolve, reject) => {
    redisClient.get(key, (err, result) => {
      if (!(err === null)){
        return reject(err)
      }
      resolve(result)
    })
  })

module.exports = get
