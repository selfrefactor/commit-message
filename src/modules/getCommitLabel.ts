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

const PADDING_LIMIT = 12

const getPadding = (str: string): string => {
  const howLong = PADDING_LIMIT - str.length

  return Array(howLong).fill(' ').join('')
}

export async function getCommitLabel(input: GetLabel): Promise<string> {
  try {
    log(`${input.commitType.key} - ${input.commitType.explanation}`, 'box')

    const filteredLabels: Label[] = input.labels.filter(singleLabel => {
      return singleLabel.belongsTo.includes(input.commitType)
    })

    const filteredLabelsValue: string[] = filteredLabels.map(singleLabel => {
      const padding = getPadding(singleLabel.value)
      return `${singleLabel.value}${padding}|-| ${singleLabel.explanation}`
    })

    const promptOptions: PromptSelect = {
      choices: filteredLabelsValue,
      default: filteredLabelsValue[0],
      question: ASK_FOR_LABEL,
    }

    const labelRaw = await promptSelect(promptOptions)

    const labelIndex = filteredLabelsValue.indexOf(labelRaw)

    const label = filteredLabels[labelIndex].value

    return label === CUSTOM_LABEL.value ?
      await promptInput(ASK_FOR_CUSTOM_LABEL) :
      label
  } catch (err) {
    throw err
  }
}
