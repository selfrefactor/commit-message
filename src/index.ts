import { ASK_FOR_MESSAGE } from './constants'
import { getTypeCommit } from './modules/getTypeCommit'
import { promptInput } from './modules/promptInput'
import { showExplanations } from './modules/showExplanations'

/**
 * It ask the user for type and text of commit and returns the final commit message.
 *
 * @returns {Promise<string>}
 */
export async function commitMessage(): Promise<string> {

  showExplanations()

  const typeCommit = await getTypeCommit()

  const messageCommit = await promptInput(ASK_FOR_MESSAGE)

  return `${typeCommit} - ${messageCommit}`
}
