import { log } from 'log'
import { ASK_FOR_LABEL, labels } from '../constants'
import { CommitType, PromptSelect } from '../typings'
import { promptSelect } from './promptSelect'

export async function getCommitLabel(commitType: CommitType): Promise<string> {
  try {
    log(commitType.key, commitType.explanation, 'info')

    const promptOptions: PromptSelect = {
      choices: labels,
      default: '',
      question: ASK_FOR_LABEL,
    }

    const label = await promptSelect(promptOptions)

    return label
  } catch (err) {
    throw err
  }
}
