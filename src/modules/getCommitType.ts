import { ASK_FOR_TYPE, typesOfCommit, typesOfCommitKeys } from '../constants'
import { CommitType, PromptSelect } from '../typings'
import { promptSelect } from './promptSelect'

export async function getCommitType(): Promise<CommitType> {
  try {
    const promptOptions: PromptSelect = {
      choices: typesOfCommitKeys,
      question: ASK_FOR_TYPE,
    }

    const typeOfCommitKey = await promptSelect(promptOptions)

    const [commit] = typesOfCommit.filter(x => x.key === typeOfCommitKey)

    return commit
  } catch (err) {
    throw err
  }
}
