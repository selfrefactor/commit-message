import { log } from 'helpers'

export function filePathInfo() {
  const info = `Please include the folder as well
Example input: 'foo/helpers/get.info'
This will create './src/foo/helpers/getInfo.ts'`

  log(info, 'icon.tag=foo')
}
