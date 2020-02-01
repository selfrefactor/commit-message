import { kebabCase } from 'string-fn'
import { setter } from 'client-helpers'
import { random } from 'rambdax'

export function settingsRandom(action: Action, state: Store): Store {
  console.log('settingsRandom')
  const randomIndex = random(
    0,
    state.db.length - 1
  )
  const randomInstance = state.db[randomIndex]
  setter('id', kebabCase(randomInstance.altTag))
  window.location.reload(false)
  
  return state
}
