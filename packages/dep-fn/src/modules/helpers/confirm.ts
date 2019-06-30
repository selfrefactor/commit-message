import { prompt } from 'inquirer'

export const confirm = async (question: string, dependency: string): Promise<boolean> => {
  if (process.env.DEP_FN_UPDATE_ALL === 'true') return true

  const { answer } = await prompt([
    { type: confirm, name: 'answer', default: 'Y', message: question },
  ])

  return answer.toLowerCase() === 'y'
}
