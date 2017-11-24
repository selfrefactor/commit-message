import { ASK_FOR_MESSAGE } from './constants'
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

  const commitType = await getCommitType()

  const commitLabel = commitType.needsLabel ?
    await getCommitLabel(commitType) :
    ''

  const commitFirstPart = commitLabel === '' ?
    `${commitType.value}` :
    `${commitType.value}@${commitLabel}`

  const commitMessageValue = await promptInput(ASK_FOR_MESSAGE)

  return `${commitFirstPart}: ${commitMessageValue}`
}
