import {prompt} from 'inquirer'

export async function promptInput(question: string): Promise<string> {
  const {answer} = await prompt([
    {
      type: 'input',
      name: 'answer',
      message: question,
    },
  ])

  return answer
}
