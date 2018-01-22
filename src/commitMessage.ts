import {
  ASK_FOR_MESSAGE,
  labels,
  PROGRESS_LABEL,
  START_LABEL,
  STOP_LABEL,
  typesOfCommit,
} from './constants'
import { getCommitLabel } from './modules/getCommitLabel'
import { getCommitType } from './modules/getCommitType'
import { getWorkInProgress } from './modules/getWorkInProgress'
import { promptInput } from './modules/promptInput'
import { saveWorkInProgress } from './modules/saveWorkInProgress'
import { showExplanations } from './modules/showExplanations'

function getWorkInProgressFlag(commitLabel: string) {

  return commitLabel === START_LABEL.value ||
    commitLabel === STOP_LABEL.value ||
    commitLabel === PROGRESS_LABEL.value
}

/**
 * It ask the user for type and text of commit and returns the final commit message.
 *
 * @returns {Promise<string>}
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

  const inputResult = await promptInput(ASK_FOR_MESSAGE)

  const hasWorkInProgress = getWorkInProgressFlag(commitLabel)
  const separator = inputResult.trim() !== '' ?
    ' | ' :
    ''

  const commitMessageValue = hasWorkInProgress ?
    `${workInProgress}${separator}${inputResult.trim()}` :
    inputResult

  if (commitLabel === START_LABEL.value) {
    saveWorkInProgress(inputResult)
  } else if (commitLabel === STOP_LABEL.value) {
    saveWorkInProgress('')
  }

  return `${commitFirstPart}: ${commitMessageValue.trim()}`
}
