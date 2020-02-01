import * as Driver from 'driver.js'
import { head, toLower } from 'rambdax'
import { words } from 'string-fn'
import { infoSteps } from '../_helpers/infoSteps'

export function infoBee(action: Action) {
  // LearningMeme is ls
  // WriteSentence is ws
  // ============================================
  const namespace = words(action.payload)
    .map(head)
    .map(toLower)
    .join('')

  const steps = infoSteps(namespace)
  if (steps === undefined) return

  const driver = new Driver({
    animate: true,
    opacity: 0.85,
  })

  driver.defineSteps(steps)
  driver.start()
}
