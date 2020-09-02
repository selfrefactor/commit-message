const R = require('rambdax')

const set = ({ redisClient, key, value }) => {
  if (R.type(value) === 'Object'){
    value = JSON.stringify(value)
  }
  redisClient.set(key, value)
}

// TODO expirySet as another method

// if (expiryFlag === true || defaultExpiryFlag === true) {
//       const expiryPeriod = R.defaultTo(defaultExpiryValue, expiryValue)

//       redisClient.set(
//         key,
//         value,
//         'EX',
//         expiryPeriod
//       )
//     }

module.exports = set
