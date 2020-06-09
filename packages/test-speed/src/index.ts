require('env')('special')
import { captureError } from 'capture-error'
import { log } from 'log'
import { gtmetrix as gtmetrixModule } from './modules/gtmetrix'
import { gtmetrixPoll } from './modules/gtmetrixPoll'
import { psi as psiModule } from './modules/psi'
import { webPageTest } from './modules/webPageTest'

export async function testURL(url: string) {
  try {
    const [gtmetrixPollCommand, psi, _] = await Promise.all([
      gtmetrixModule(url),
      psiModule(url),
      webPageTest(url),
    ])

    log(psi, 'obj')

    const gtmetrixResult = await gtmetrixPoll(gtmetrixPollCommand as string)
    log(gtmetrixResult, 'obj')
  } catch (err) {
    captureError(err, { exitFlag: true })
  }
}
