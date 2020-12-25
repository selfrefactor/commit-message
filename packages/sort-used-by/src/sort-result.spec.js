import { sortResult } from './sort-result'
import { RESULT } from './sort-used-by'
import { readJson } from 'fs-extra'

test('happy', async () => {
  const rawResult = await readJson(RESULT)
  const sorted = sortResult(rawResult)
  console.log(sorted[0])
})