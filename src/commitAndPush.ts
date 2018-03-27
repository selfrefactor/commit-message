import { execCommand } from './_modules/execCommand'
import { commitMessage } from './commitMessage'

export async function commitAndPush(flag?: boolean): Promise<string> {
  try {
    const commitMessageValue = await commitMessage(flag)

    await execCommand('git add . --all')
    await execCommand(`git commit -m "${commitMessageValue}"`)
    await execCommand('git push')

    return `Pushed with message '${commitMessageValue}'`
  } catch (err) {
    throw err
  }
}
