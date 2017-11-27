import { commitMessage } from './'
import { execCommand } from './modules/execCommand'

export async function commitAndPush(): Promise<string> {
  try {
    const commitMessageValue = await commitMessage()

    await execCommand('git add . --all')
    await execCommand(`git commit -m "${commitMessageValue}"`)
    await execCommand('git push')

    return `Pushed with message '${commitMessageValue}'`
  } catch (err) {
    throw err
  }
}