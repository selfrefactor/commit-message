const R = require('rambdax')

const remove = (redisClient, key) =>
  new Promise((resolve, reject) => {
    redisClient.del(key, (err, result) => {
      if (!(err === null)){
        return reject(err)
      }
      resolve(result)
    })
  })

module.exports = remove
