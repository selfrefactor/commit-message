import {
  ASK_FOR_LABEL,
} from '../constants'
import {log} from 'helpers-fn'
import {GetLabel, Label, PromptSelect} from '../typings'
import {promptSelect} from './promptSelect'

const PADDING_LIMIT = 10

const getPadding = (str: string): string => {
  const howLong = PADDING_LIMIT - str.length

  return howLong > 0 ? Array(howLong).fill(' ').join('') : ''
}

function extractValue(actualLabel) {
  const [toReturn] = actualLabel.split(' ')

  return toReturn
}

export async function getCommitLabel(input: any): Promise<string> {
  console.log({input})
  log('sepx')
  log(`${input.commitType.key} - ${input.commitType.explanation}`, '')
  log('sepx')

  const filteredLabels: Label[] = input.labels.filter(singleLabel => {
    return singleLabel.belongsTo.includes(input.commitType)
  })
  const filteredLabelsValue: string[] = filteredLabels.map(singleLabel => {
    const padding = getPadding(singleLabel.value)

    return `${singleLabel.value}${padding} ${singleLabel.explanation}`
  })

  const promptOptions: PromptSelect = {
    choices: filteredLabelsValue,
    default: filteredLabelsValue[0],
    question: ASK_FOR_LABEL,
  }
  const labelAnswer = await promptSelect(promptOptions)
  const [labelRaw]: any = filteredLabelsValue.filter(x => x === labelAnswer)
  const label = extractValue(labelRaw)
  console.log({label})
  return 'toReturn'
}
