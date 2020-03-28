import {
  ASK_FOR_CUSTOM_LABEL,
  ASK_FOR_LABEL,
  CUSTOM_LABEL,
} from '../constants'
import {promptInput} from './promptInput'

import {log} from 'helpers-fn'

import {load, save} from '../../../package-storage/index.js'
import {GetLabel, Label, PromptSelect} from '../typings'
import {promptSelect} from './promptSelect'

const PADDING_LIMIT = 10

const getPadding = (str: string): string => {
  const howLong = PADDING_LIMIT - str.length

  return howLong > 0 ? Array(howLong).fill(' ').join('') : ''
}

/**
 * Every time custom label is selected
 * it will be saved as label in the current `commitType` context
 */
export async function askCustomLabel(input: GetLabel): Promise<string> {
  const label = await promptInput(ASK_FOR_CUSTOM_LABEL)
  const key = input.commitType.key.toLowerCase()
  /**
   * When this is not the first label for this `commitType` context
   */
  const loaded = load('commitMessage', key, true)
  const isNewLabel = loaded === undefined || loaded.push === undefined

  const toSave = isNewLabel ? [label] : [...loaded, label]

  save('commitMessage', key, toSave, true)

  log(
    `label '${label}' is part of '${key}' context | is.new = '${isNewLabel}'`,
    'info'
  )

  return label
}

function extractValue(actualLabel) {
  const [toReturn] = actualLabel.value.split(' ')

  return toReturn
}

export async function getCommitLabel(input: GetLabel): Promise<string> {
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
  const [labelRaw]: any = filteredLabelsValue.filter(
    x => (x as any).name === labelAnswer
  )
  const label = extractValue(labelRaw)

  const toReturn =
    label === CUSTOM_LABEL.value ? askCustomLabel(input) : label

  return toReturn
}
