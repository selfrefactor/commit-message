import {existsSync} from 'fs'
import {readJsonSync} from 'fs-extra'
import * as log from 'log-fn'
import { resolve } from 'path'
import {any, isNil} from 'rambdax'

const settingsLocation = resolve(__dirname, '../../files/config.json')

export const getCredentials = (): ICredentials => {
  if (existsSync(settingsLocation)){
    return readJsonSync(settingsLocation)
  }

  const user = process.env.GITHUB_USER
  const password = process.env.GITHUB_PASSWORD
  if (any(isNil, [user, password])){
    log('You haven\'t set credentials!', 'error')
    log('Check https://github.com/selfrefactor/tag-fn#initialization', 'info')
    process.exit()
  }

  return {user, password}
}
