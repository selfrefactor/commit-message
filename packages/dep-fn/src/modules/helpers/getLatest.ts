import {execCommand} from './execCommand'

import {last} from 'rambdax'

export const getLatest = async(dependency: string): Promise<string> => {
  const command = `npm info --json ${dependency}`
  const packageInfoRaw: string = await execCommand(command)
  try {
    const packageInfo = JSON.parse(packageInfoRaw)

    const filtered = packageInfo.versions.filter(
      (x: string) => !x.includes('-') && !x.includes('alpha')
    )
    if (filtered.length === 0) return last(packageInfo.versions)

    return last(filtered)
  } catch (err) {
    console.log(err, 'dep.fn')
    process.exit(1)
  }
}
