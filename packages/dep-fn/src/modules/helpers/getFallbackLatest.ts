import { execCommand } from './execCommand'

import {
  debug,
  last,
} from 'rambdax'

export const getFallBackLatest = async (
  dependency: string,
): Promise<string> => {
  const command = `npm info --json ${dependency}`
  const packageInfoRaw: string = await execCommand(command)
  try {
    const packageInfo = JSON.parse(packageInfoRaw)

    return last(packageInfo.versions)
  } catch (err) {
    debug(err)
  }
}
