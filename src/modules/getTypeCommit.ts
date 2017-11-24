import { ASK_FOR_TYPE, typesOfCommit } from '../constants'
import { PromptSelect } from '../index.d'
import { promptSelect } from './promptSelect'

export async function getTypeCommit(): Promise<string> {
  try {
    const promptOptions: PromptSelect = {
      choices: typesOfCommit,
      question: ASK_FOR_TYPE,
    }

    const typeCommit = await promptSelect(promptOptions)

    return typeCommit
  } catch (err) {
    throw err
  }
}
