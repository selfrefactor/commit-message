import {
  NO_LABEL,
  CUSTOM_LABEL,
  ALL_LABELS,
  customCommitLabels,
  USER_LABEL_INPUT,
} from '../constants'
import {log} from 'helpers-fn'
import * as inquirer from 'inquirer'
import * as fuzzy from 'fuzzy'
import {sort, last, setter, getter} from 'rambdax'

function sortFn(a: any, b: any) {
  if (customCommitLabels.includes(a)) return -1
  if (customCommitLabels.includes(b)) return 1

  if (a.includes(' ') && !b.includes(' ')) return -1
  if (!a.includes(' ') && b.includes(' ')) return 1
  return a > b ? -1 : 1
}

async function searchStates(_, userInput) {
  setter(USER_LABEL_INPUT, userInput)
  const labels = fuzzy
    .filter(userInput || '', ALL_LABELS)
    .map(function(el) {
      return el.original
    })
  const sorted = sort(sortFn, labels)
  if (labels.length === 0) return [CUSTOM_LABEL]
  if (labels.length === ALL_LABELS.length) return [NO_LABEL, ...sorted]

  return sorted
}

async function pickLabel() {
  const {state} = await inquirer.prompt([
    {
      type: 'autocomplete',
      name: 'state',
      message: 'Label:',
      source: searchStates,
      pageSize: 5,
    },
  ])
  if (state === CUSTOM_LABEL) return getter(USER_LABEL_INPUT)
  if (!state.includes(' ')) return state

  return last(state.split(' '))
}

export async function getCommitLabel(input: CommitType): Promise<string> {
  inquirer.registerPrompt(
    'autocomplete',
    require('inquirer-autocomplete-prompt')
  )
  log('sepx')
  log(`${input.key} - ${input.explanation}`, 'bar')
  log('sepx')

  return pickLabel()
}
