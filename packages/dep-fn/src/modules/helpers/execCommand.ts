import * as child_process from 'child_process'

const { promisify } = require('util')

const exec = promisify(child_process.exec)

export const execCommand = async (command: string): Promise<string> => {
  const {stdout} = await exec(command, {cwd: process.cwd()})

  return stdout
}
