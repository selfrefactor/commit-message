import {execCommand} from './_modules/execCommand'
import {commitMessage} from './commitMessage'

export async function commitAndPush(cwd): Promise<string> {
  const commitMessageValue = await commitMessage(cwd)

  await execCommand('git add . --all')
  await execCommand(`git commit -m "${commitMessageValue}"`)
  await execCommand('git push')

  return `Pushed with message '${commitMessageValue}'`
}
