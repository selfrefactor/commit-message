import { ASK_FOR_TYPE, typesOfCommitKeys } from '../constants'
import { PromptSelect } from '../index.d'
import { promptSelect } from './promptSelect'

export async function getTypeCommit(): Promise<string> {
  try {
    const promptOptions: PromptSelect = {
      choices: typesOfCommitKeys,
      question: ASK_FOR_TYPE,
    }

    const typeOfCommitKey = await promptSelect(promptOptions)

    return typeOfCommitKey
  } catch (err) {
    throw err
  }
}
