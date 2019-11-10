import { prompt } from 'inquirer'
import { log } from 'helpers'
import { generateChoices } from './generateChoices'

const choices = generateChoices(['TRUE', 'FALSE'])

export async function askListBooleanTemplate(input: AskTemplate): Promise<boolean> {
  if (input.info) {
    log(input.info, 'info')
  }

  const answer = await prompt([{
    choices: choices,
    message: `${input.question}?`,
    name: input.key,
    type: 'list',
  }])

  return answer[input.key] === 'TRUE'
}
