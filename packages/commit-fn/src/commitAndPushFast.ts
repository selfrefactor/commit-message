import {execCommand} from './_modules/execCommand'
import {commitMessageFast} from './commitMessageFast'

export async function commitAndPushFast(cwd): Promise<void> {
  const commitMessageValue = await commitMessageFast(cwd)

  // await execCommand('git add . --all')
  // await execCommand(`git commit -m "${commitMessageValue}"`)
  // await execCommand('git push')

}
