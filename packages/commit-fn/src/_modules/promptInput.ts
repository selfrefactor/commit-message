import {prompt} from 'enquirer'

export async function promptInput(question: string): Promise<string> {
  const result: any = await prompt([
    {
      message: question,
      name: 'answer',
      type: 'input',
    },
  ])

  return result.answer
}
