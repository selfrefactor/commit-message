import { resolve } from 'path'

import { parseHjson } from './parse-hjson'

test('happy', async () => {
  const filePath = `${ __dirname }/assets/foo.hjson`
  const parsed = await parseHjson(filePath)
})
