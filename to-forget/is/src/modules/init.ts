import { existsSync, readFileSync } from 'fs'
import { parseTypings } from '../helpers/parseTypings'

export function init(filePath: string): InitResult {
  const initFlag = existsSync(filePath) && filePath.endsWith('.d.ts')

  if (!initFlag) {

    return {
      allInterfaces: {},
      interfaces: {},
    }
  }

  const typingsContent = readFileSync(filePath).toString()

  return parseTypings(typingsContent)
}
