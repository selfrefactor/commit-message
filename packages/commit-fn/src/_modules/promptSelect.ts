import * as Enquirer from 'enquirer'
import { PromptSelect } from '../typings'

export async function promptSelect(input: PromptSelect): Promise<string> {
  const select = new (Enquirer as any).Select({
    choices: input.choices,
    message: input.question,
    name: 'answer',
  });
  
  const answer = await select.run()
  return answer  
}
