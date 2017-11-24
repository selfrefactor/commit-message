import { getTypeCommit } from './modules/getTypeCommit'

/**
 * It ask the user for type and text of commit and returns the final commit message.
 *
 * @returns {Promise<string>}
 */
export async function commitMessage(): Promise<string> {

  const typeCommit = await getTypeCommit()
  return typeCommit
}
