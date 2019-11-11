require('env-fn')('special')
const R = require('rambda')
const { redisFn } = require('../src/')
const KEY = 'foo'
const KEY_OBJ = 'foo_obj'
const VALUE = 'bar'
const VALUE_OBJ = {
  a : 1,
  b : 2,
  c : 3,
}
const UPDATE_VALUE = { c : 4 }
const UPDATE_OBJ_EXPECTED_RESULT = {
  a : 1,
  b : 2,
  c : 4,
}

const delay = ms =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve()
    }, ms)
  })

const debug = async () => {
  try {
    const redis = await redisFn({
      defaultExpiryFlag  : true,
      defaultExpiryValue : 1,
    })

    redis.set({
      key   : KEY,
      value : VALUE,
    })

    console.log(await redis.get(KEY) === VALUE)

    redis.remove(KEY)

    console.log(await redis.get(KEY) === null)

    redis.set({
      key   : KEY,
      value : VALUE,
    })

    console.log(await redis.get(KEY) === VALUE)

    await delay(1100)

    console.log(await redis.get(KEY) === null)

    redis.set({
      key   : KEY_OBJ,
      value : VALUE_OBJ,
    })

    console.log(R.equals(await redis.getObj(KEY_OBJ), VALUE_OBJ))

    const updateResult = await redis.updateObj({
      key         : KEY_OBJ,
      value       : UPDATE_VALUE,
      expiryValue : 2,
    })

    console.log(R.equals(updateResult, UPDATE_OBJ_EXPECTED_RESULT))
    console.log(
      R.equals(await redis.getObj(KEY_OBJ), UPDATE_OBJ_EXPECTED_RESULT)
    )

    await delay(1100)

    console.log(
      R.equals(await redis.getObj(KEY_OBJ), UPDATE_OBJ_EXPECTED_RESULT)
    )

    await delay(1100)

    console.log(await redis.get(KEY_OBJ) === null)

    process.exit()
  } catch (err){
    console.log(err)
  }
}

debug()
