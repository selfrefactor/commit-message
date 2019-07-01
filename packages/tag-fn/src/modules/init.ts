import {writeJsonSync} from 'fs-extra'
import {log} from 'helpers'
import {resolve} from 'path'
const settingsLocation = resolve(__dirname, '../../files/config.json')

export const init = (credentials: ICredentials): void => {
  writeJsonSync(settingsLocation, credentials)
  log('Credentials are set.', 'info')
}
