import { readJson } from 'fs-extra'

import { parseResult } from './parse-result'

test('happy', async () => {
  const rawResult = await readJson(`${ __dirname }/test-result.json`)
  const parsed = parseResult(rawResult)
  expect(parsed).toMatchSnapshot()
})
