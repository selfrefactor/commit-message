import { getter, setter } from 'client-helpers'
import { kebabCase } from 'string-fn'

function resetMode(){
  setter('id', null)
  const [base] = window.location.href.split('?reset')
  window.location.href = base
}

export const sharedNextReadyBee = (currentInstance: any) => {
  const reset = getter('reset')

  // Attach here for reset mode
  // It could be anywhere, then why not here
  // ============================================
  if (reset) return resetMode()

  const id = kebabCase(currentInstance.altTag)
  console.log(id)
  setter('id', id)
}
