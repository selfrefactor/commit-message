import {
  ASK_FOR_CUSTOM_LABEL,
  ASK_FOR_LABEL,
  CUSTOM_LABEL,
  EMPTY_LABEL,
} from '../constants'
import { promptInput } from './promptInput'

import { log } from 'log'

import { GetLabel, Label, PromptSelect } from '../typings'
import { promptSelect } from './promptSelect'

function pluck<T>(keyToPluck: string, arr: object[]): T[] {
  const willReturn = []

  arr.map(
    val => {
      if (!(val[keyToPluck] === undefined)) {
        willReturn.push(val[keyToPluck])
      }
    },
  )

  return willReturn
}

export async function getCommitLabel(input: GetLabel): Promise<string> {
  try {
    log(`${input.commitType.key} - ${input.commitType.explanation}`, 'box')

    const filteredLabels: Label[] = input.labels.filter(singleLabel => {
      return singleLabel.belongsTo.includes(input.commitType)
    })

    filteredLabels.map(singleLabel => {
      if (singleLabel.value !== EMPTY_LABEL.value) {
        log(`${singleLabel.value} - ${singleLabel.explanation}`, '')
      }
    })

    const filteredLabelsValue: string[] = pluck<string>('value', filteredLabels)

    const promptOptions: PromptSelect = {
      choices: filteredLabelsValue,
      default: '',
      question: ASK_FOR_LABEL,
    }

    const label = await promptSelect(promptOptions)

    return label === CUSTOM_LABEL.value ?
      await promptInput(ASK_FOR_CUSTOM_LABEL) :
      label
  } catch (err) {
    throw err
  }
}
