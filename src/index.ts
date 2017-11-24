import { ASK_FOR_MESSAGE } from './constants'
import { getTypeCommit } from './modules/getTypeCommit'
import { promptInput } from './modules/promptInput'

/**
 * It ask the user for type and text of commit and returns the final commit message.
 *
 * @returns {Promise<string>}
 */
export async function commitMessage(): Promise<string> {

  const typeCommit = await getTypeCommit()

  const messageCommit = await promptInput(ASK_FOR_MESSAGE)

  return messageCommit
  // return typeCommit
}
