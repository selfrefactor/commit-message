import { log } from 'log'
import {
  ASK_FOR_MESSAGE,
  labels,
  PROGRESS_LABEL,
  START_LABEL,
  STOP_LABEL,
  typesOfCommit,
} from './constants'

import { getCommitLabel } from './_modules/getCommitLabel'
import { getCommitType } from './_modules/getCommitType'
import { getWorkInProgress } from './_modules/getWorkInProgress'

import { promptInput } from './_modules/promptInput'
import { saveWorkInProgress } from './_modules/saveWorkInProgress'
import { showExplanations } from './_modules/showExplanations'

function getWorkInProgressFlag(commitLabel: string) {

  return commitLabel === START_LABEL.value ||
    commitLabel === STOP_LABEL.value ||
    commitLabel === PROGRESS_LABEL.value
}

/**
 * It ask the user for type and text of commit and returns the final commit message.
 */
export async function commitMessage(flag?: boolean): Promise<string> {
  const workInProgress = getWorkInProgress()

  showExplanations()

  const commitType = await getCommitType(typesOfCommit)

  const commitLabel = await getCommitLabel({
    commitType,
    labels,
  })

  const commitFirstPart = commitLabel === '' ?
    `${commitType.value}` :
    flag ?
      `${commitType.value}(${commitLabel})` :
      `${commitType.value}@${commitLabel}`

  if (workInProgress.length > 0) {
    log(`WorkInProgress - '${workInProgress}'`, 'info')
  }

  const inputResult = await promptInput(ASK_FOR_MESSAGE)

  const hasWorkInProgress = getWorkInProgressFlag(commitLabel)

  const separatorFlag = hasWorkInProgress &&
    commitLabel !== START_LABEL.value &&
    inputResult.trim() !== ''

  const separator = separatorFlag ?
    ' | ' :
    ''

  let commitMessageValue = hasWorkInProgress ?
    `${workInProgress}${separator}${inputResult.trim()}` :
    inputResult

  if (commitLabel === START_LABEL.value) {
    saveWorkInProgress(inputResult)
  } else if (commitLabel === STOP_LABEL.value) {
    commitMessageValue = workInProgress
    saveWorkInProgress('')
  }

  return commitMessageValue.trim() === '' ?
    commitFirstPart :
    `${commitFirstPart}: ${commitMessageValue.trim()}`
}
