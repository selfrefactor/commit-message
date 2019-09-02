import { exec as execModule } from 'child_process'

export function exec(input: { command: string, cwd: string }): Promise<Array<string>> {
  return new Promise((resolve, reject) => {
    const willReturn = []
    const execCommand = execModule(input.command, { cwd: input.cwd })

    execCommand.stdout.on('data', chunk => {
      willReturn.push((chunk as Buffer).toString('utf8'))
    })
    execCommand.stdout.on('end', () => resolve(willReturn))
    execCommand.stdout.on('error', err => reject(err))
  })
}
