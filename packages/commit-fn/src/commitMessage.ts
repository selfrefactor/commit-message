import {log} from 'helpers-fn'
import {
  ASK_FOR_MESSAGE,
  typesOfCommit,
} from './constants'

import {getLatestCommits} from './_modules/getLatestCommits'
import {getCommitLabel} from './_modules/getCommitLabel'
import {getCommitType} from './_modules/getCommitType'
import {getWorkInProgress} from './_modules/getWorkInProgress'

import {promptInput} from './_modules/promptInput'
import {saveWorkInProgress} from './_modules/saveWorkInProgress'
import {showExplanations} from './_modules/showExplanations'

// It ask the user for type and text of commit
// and returns the final commit message.
// ============================================
export async function commitMessage(dir = process.cwd()): Promise<string> {
  const latestCommits = await getLatestCommits(dir)
  latestCommits.forEach(singleCommit => {
    log(singleCommit, 'info')
  })
  log('sep')
  const workInProgress = getWorkInProgress()
  showExplanations()
  const commitType = await getCommitType(typesOfCommit)
  const commitLabel = await getCommitLabel({
    commitType,
  })

  if (workInProgress.length > 0) {
    log(`WorkInProgress - '${workInProgress}'`, 'info')
  }

  const commitMessageValue = await promptInput(ASK_FOR_MESSAGE)

  const noInput = commitMessageValue.trim() === ''
  const noLabel = commitLabel === ''

  if (noInput && noLabel) {
    return commitType.value
  }
  if (noInput && !noLabel) {
    return `${commitType.value}@${commitLabel}`
  }
  if (!noInput && noLabel) {
    return `${commitType.value}: ${commitMessageValue}`
  }
  return `${commitType.value}@${commitLabel} ${commitMessageValue}`
}
