import { playwrightScreens } from './playwright-screens'
import {ms} from 'string-fn'
jest.setTimeout(ms(`12 minutes`))

function waitFor(_) {
  return async() => {
    const el = await _.page.$('#test-id')
    if (!el) throw new Error('no element with #test-id')
    const replReadyIndicator = await el.getAttribute('data-repl-ready')

    return replReadyIndicator === 'true'
  }
}

async function waitForReady(_){
  await _.waitForPredicate(waitFor(_), 10000)
}

test('happy', async () => {
  await playwrightScreens({
    url: 'http://localhost:4200/adjust',
    waitForReady
  })
})