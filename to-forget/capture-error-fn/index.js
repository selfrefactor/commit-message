const { envFn } = require('env-fn')
envFn('special')
const Raven = require('raven')

Raven.config(process.env.SENTRY_DSN).install()

const onCallback = (extra, eventID) => {
  console.log(`Logged in Sentry with eventId '${ eventID }'`)

  if (extra.exitFlag){
    console.log('\'capture-error\' module will cause process exit!')

    setTimeout(() => {
      process.exit()
    }, 1000)
  }
}

const captureError = (err, extra = {}) => {
  if (typeof err === 'string'){
    return Raven.captureMessage(err, (_, eventID) => {
      onCallback(extra, eventID)
    })
  }

  Raven.captureException(
    err, {}, (_, eventID) => {
      onCallback(extra, eventID)
    }
  )
}

exports.captureError = captureError
