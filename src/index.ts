import { ASK_FOR_MESSAGE, labels, START_LABEL, typesOfCommit } from './constants'
import { getCommitLabel } from './modules/getCommitLabel'
import { getCommitType } from './modules/getCommitType'
import { promptInput } from './modules/promptInput'
import { saveWorkInProgress } from './modules/saveWorkInProgress'
import { showExplanations } from './modules/showExplanations'

/**
 * It ask the user for type and text of commit and returns the final commit message.
 *
 * @returns {Promise<string>}
 */
export async function commitMessage(flag?: boolean): Promise<string> {

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

  const commitMessageValue = await promptInput(ASK_FOR_MESSAGE)

  if (commitLabel === START_LABEL.value) {
    saveWorkInProgress(commitMessageValue)
  }

  return `${commitFirstPart}: ${commitMessageValue}`
}

export { commitAndPush } from './commitAndPush'
