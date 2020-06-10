const { envFn } = require('env-fn')
envFn('special')
const { gtmetrix } = require('./modules/gtmetrix')
const { gtmetrixPoll } = require('./modules/gtmetrix-poll')
const { log } = require('helpers-fn')
const { psi } = require('./modules/psi')
const { webPageTest } = require('./modules/web-page-test')

async function testGTMetrix(url){
  const gtmetrixPollCommand = await gtmetrix(url)
  const gtmetrixResult = await gtmetrixPoll(gtmetrixPollCommand)
  log(gtmetrixResult, 'obj')
}

async function testPSI(url){
  const psiResult = await psi(url)
  log(psiResult, 'obj')
}

async function testSpeedFn(url){
  // const [gtmetrixPollCommand, psiResult, _] = await Promise.all([
  //   gtmetrixModule(url),
  //   psiModule(url),
  //   webPageTest(url),
  // ])
  // log(psi, 'obj')
  // const gtmetrixResult = await gtmetrixPoll(gtmetrixPollCommand as string)
  // log(gtmetrixResult, 'obj')
}

exports.testGTMetrix = testGTMetrix
exports.testPSI = testPSI
exports.testSpeedFn = testSpeedFn
