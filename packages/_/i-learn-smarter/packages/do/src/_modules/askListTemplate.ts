import { prompt } from 'inquirer'
import { log } from 'log'
import { generateChoices } from './generateChoices'

export async function askListTemplate(input: AskListTemplate): Promise<string> {
  if (input.info) {
    log(input.info, 'info')
  }

  const answer = await prompt([{
    choices: generateChoices(input.choices),
    message: `${input.question}?`,
    name: input.key,
    type: 'list',
  }])
  log('sep')

  return answer[input.key]
}
