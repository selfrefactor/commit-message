import {writeJsonSync} from 'fs-extra'
import * as log from 'log-fn'

import {resolve} from 'path'
const settingsLocation = resolve(__dirname, '../../files/config.json')

export const init = (credentials: ICredentials): void => {
  writeJsonSync(settingsLocation, credentials)
  log('Credentials are set.', 'info')
}
