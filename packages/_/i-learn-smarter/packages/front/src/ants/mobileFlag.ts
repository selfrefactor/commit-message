import { getterAnt } from 'client-helpers'
import { once } from 'rambdax'

const hash = {
  big: undefined,
  small: undefined,
}

const mobileFlagFn = () => {
  const {big, small} = getterAnt(hash)
  if (big === true) { return false }
  if (small === true) { return true }

  return window.outerWidth < 800
}

export const mobileFlagAnt = once(mobileFlagFn)
