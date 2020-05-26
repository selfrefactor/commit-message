import {ASK_FOR_LABEL, NO_LABEL, ALL_LABELS} from '../constants'
import {log} from 'helpers-fn'
import * as inquirer from 'inquirer'
import * as fuzzy from 'fuzzy'
import {sort} from 'rambdax'

function sortFn(a: any, b: any){
  if(a.includes(' ')&&!b.includes(' ')) return -1
  if(!a.includes(' ')&&b.includes(' ')) return 1
  return a > b ? -1 : 1
}

async function searchStates(_, input) {
  const labels = fuzzy.filter(input || '', ALL_LABELS).map(function(el) {
    return el.original
  })
  const sorted = sort(sortFn)(labels)
  if (labels.length === 0) return [NO_LABEL]
  if (labels.length === ALL_LABELS.length) return [NO_LABEL, ...sorted]

  return sorted
}

async function pickLabel(mode?: string) {
  const {state} = await inquirer.prompt([
    {
      type: 'autocomplete',
      name: 'state',
      message: 'Label:',
      source: searchStates,
    },
  ])

  return state
}

function extractValue(actualLabel) {
  const [toReturn] = actualLabel.split(' ')

  return toReturn
}

inquirer.registerPrompt(
  'autocomplete',
  require('inquirer-autocomplete-prompt')
)
export async function getCommitLabel(input: any): Promise<string> {
  console.log({input})
  log('sepx')
  log(`${input.commitType.key} - ${input.commitType.explanation}`, '')
  log('sepx')

  await pickLabel()
  // const filteredLabels: Label[] = input.labels.filter(singleLabel => {
  //   return singleLabel.belongsTo.includes(input.commitType)
  // })
  // const filteredLabelsValue: string[] = filteredLabels.map(singleLabel => {
  //   const padding = getPadding(singleLabel.value)

  //   return `${singleLabel.value}${padding} ${singleLabel.explanation}`
  // })

  // const promptOptions: PromptSelect = {
  //   choices: filteredLabelsValue,
  //   default: filteredLabelsValue[0],
  //   question: ASK_FOR_LABEL,
  // }
  // const labelAnswer = await promptSelect(promptOptions)
  // const [labelRaw]: any = filteredLabelsValue.filter(x => x === labelAnswer)
  // const label = extractValue(labelRaw)
  // console.log({label})
  return 'toReturn'
}
