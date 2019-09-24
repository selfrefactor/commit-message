import { exec } from 'child_process'

// tslint:disable-next-line
export function execCommand<T>(command, cwd, flag): Promise<T[]>{
  return new Promise((resolve, reject) => {
    const proc = exec(command, { cwd })
    const willReturn = []
    proc.stdout.on('data', chunk => {
      if (flag === undefined) {

        console.log(chunk.toString())
      }
      willReturn.push(chunk.toString())
    })
    proc.stdout.on('end', () => resolve(willReturn))
    proc.stdout.on('error', reject)
  })
}
