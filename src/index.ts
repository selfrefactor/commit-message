import { ASK_FOR_MESSAGE, labels, typesOfCommit } from './constants'
import { getCommitLabel } from './modules/getCommitLabel'
import { getCommitType } from './modules/getCommitType'
import { promptInput } from './modules/promptInput'
import { showExplanations } from './modules/showExplanations'

/**
 * It ask the user for type and text of commit and returns the final commit message.
 *
 * @returns {Promise<string>}
 */
export async function commitMessage(): Promise<string> {

  showExplanations()

  const commitType = await getCommitType(typesOfCommit)

  const commitLabel = await getCommitLabel({
    commitType,
    labels,
  })

  const commitFirstPart = commitLabel === '' ?
    `${commitType.value}` :
    `${commitType.value}@${commitLabel}`

  const commitMessageValue = await promptInput(ASK_FOR_MESSAGE)

  return `${commitFirstPart}: ${commitMessageValue}`
}

export { commitAndPush } from './commitAndPush'
