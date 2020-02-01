import { map } from 'rambdax'

const promiseAllSecureWrapper = promise =>
  new Promise(res => {
    promise
      .then(result => {
        res({
          payload : result,
          type    : 'RESULT',
        })
      })
      .catch(err => {
        res({
          payload : err,
          type    : 'ERROR',
        })
      })
  })

export async function resolveSecure(input) {
  try {
    const promised = map(promiseAllSecureWrapper, input)

    return await Promise.all(promised)
  } catch (err) {
    console.log(err)
  }
}
