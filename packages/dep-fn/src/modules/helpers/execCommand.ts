import * as childProcess from 'child_process'
import {promisify} from 'util'

const exec = promisify(childProcess.exec)

export const execCommand = async(command: string): Promise<string> => {
  const {stdout} = await exec(command, {cwd: process.cwd()})

  return stdout
}
