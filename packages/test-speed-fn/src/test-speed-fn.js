const {envFn} = require('env-fn')
envFn('special')
import { log } from 'helpers-fn'
const { gtmetrix } = require('./modules/gtmetrix') 
const { gtmetrixPoll } = require('./modules/gtmetrix-poll') 
const { psi } = require('./modules/psi') 
const { webPageTest } = require('./modules/web-page-test') 

export async function testGTMetrix(url){
  const gtmetrixPollCommand = await gtmetrix(url)
  const gtmetrixResult = await gtmetrixPoll(gtmetrixPollCommand)
  log(gtmetrixResult, 'obj')
}

export async function testPSI(url){
  const psiResult = await psi(url)
  log(psiResult, 'obj')
}

export async function testSpeedFn(url) {
    // const [gtmetrixPollCommand, psiResult, _] = await Promise.all([
    //   gtmetrixModule(url),
    //   psiModule(url),
    //   webPageTest(url),
    // ])

    // log(psi, 'obj')

    // const gtmetrixResult = await gtmetrixPoll(gtmetrixPollCommand as string)
    // log(gtmetrixResult, 'obj')
}
