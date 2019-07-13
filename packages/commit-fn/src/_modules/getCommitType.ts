import { ASK_FOR_TYPE, FEATURE } from '../constants'
import { CommitType, PromptSelect } from '../typings'
import { promptSelect } from './promptSelect'

export async function getCommitType(typesOfCommit: CommitType[]): Promise<CommitType> {
  const typesOfCommitKeys: string[] = typesOfCommit.map(x => x.key)

  const promptOptions: PromptSelect = {
    choices: typesOfCommitKeys,
    default: FEATURE.key,
    question: ASK_FOR_TYPE,
  }

  const typeOfCommitKey = await promptSelect(promptOptions)
  const [commit] = typesOfCommit.filter(x => x.key === typeOfCommitKey)
  
  return commit
}
