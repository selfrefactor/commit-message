const { envFn } = require('env-fn')
envFn('special')

const { gtmetrix } = require('./modules/gtmetrix')
const { gtmetrixPoll } = require('./modules/gtmetrix-poll')
const { log } = require('helpers-fn')
const { psi } = require('./modules/psi')
const { webPageTest } = require('./modules/web-page-test')

async function testSpeed(url){
  const [ gtmetrixPollCommand, psiResult ] = await Promise.all([
    gtmetrix(url),
    psi(url),
  ])

  const gtmetrixResult = await gtmetrixPoll(gtmetrixPollCommand)

  const toReturn = {
    gtmetrix   : gtmetrixResult,
    lighthouse : psiResult,
  }
  log(toReturn, 'obj')

  return toReturn
}

exports.testSpeed = testSpeed
exports.webPageTest = webPageTest
