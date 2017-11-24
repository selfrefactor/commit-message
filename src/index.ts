import { ASK_FOR_MESSAGE } from './constants'
import { getCommitType } from './modules/getCommitType'
import { promptInput } from './modules/promptInput'
import { promptSelect } from './modules/promptSelect'
import { showExplanations } from './modules/showExplanations'

/**
 * It ask the user for type and text of commit and returns the final commit message.
 *
 * @returns {Promise<string>}
 */
export async function commitMessage(): Promise<string> {

  showExplanations()

  const commitType = await getCommitType()

  const label = commitType.needsLabel ?
    await getLabel() 

  const messageCommit = await promptInput(ASK_FOR_MESSAGE)

  return `${commitType.value} - ${messageCommit}`
}
