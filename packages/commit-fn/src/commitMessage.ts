import {log} from 'helpers-fn'
import {count} from 'string-fn'
import {ASK_FOR_MESSAGE, typesOfCommit, NO_LABEL} from './constants'

import {getCommitLabel} from './_modules/getCommitLabel'
import {getCommitType} from './_modules/getCommitType'

import {promptInput} from './_modules/promptInput'
import {showExplanations} from './_modules/showExplanations'

// It ask the user for type and text of commit
// and returns the final commit message.
// ============================================
export async function commitMessage(dir = process.cwd()): Promise<string> {
  log('sep')
  showExplanations()

  const commitType = await getCommitType(typesOfCommit)
  const commitLabel = await getCommitLabel(commitType)
  const labelIsMessage = count(commitLabel, ' ') > 0

  if (labelIsMessage) {
    return `${commitType.value}: ${commitLabel}`
  }

  const commitMessageValue = await promptInput(ASK_FOR_MESSAGE)

  const hasInput = commitMessageValue.trim() !== ''
  const hasLabel = commitLabel !== NO_LABEL

  if (hasInput && hasLabel) {
    return `${commitType.value}@${commitLabel} ${commitMessageValue}`
  }

  if (!hasInput && hasLabel) {
    return `${commitType.value}@${commitLabel}`
  }

  if (hasInput && !hasLabel) {
    return `${commitType.value}: ${commitMessageValue}`
  }

  return commitType.value
}
