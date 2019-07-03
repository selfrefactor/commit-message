import { prompt } from 'inquirer'
import { log } from 'helpers'

export async function askInputTemplate(input: AskTemplate): Promise<string> {
  if (input.info) {
    log(input.info, 'info')
  }

  const answer = await prompt([{
    message: `${input.question}?`,
    name: input.key,
    type: 'input',
  }])
  log('sep')

  return answer[input.key].trim()
}
