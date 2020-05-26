import {NO_LABEL, ALL_LABELS} from '../constants'
import {log} from 'helpers-fn'
import * as inquirer from 'inquirer'
import * as fuzzy from 'fuzzy'
import {sort, last} from 'rambdax'

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

async function pickLabel() {
  const {state} = await inquirer.prompt([
    {
      type: 'autocomplete',
      name: 'state',
      message: 'Label:',
      suggestOnly: true,
      source: searchStates,
    },
  ])
  if(!state.includes(' ')) return state

  return last(state.split(' '))
}

export async function getCommitLabel(input: CommitType): Promise<string> {
  inquirer.registerPrompt(
    'autocomplete',
    require('inquirer-autocomplete-prompt')
  )
  log('sepx')
  log(`${input.key} - ${input.explanation}`, '')
  log('sepx')

  return pickLabel()
}
