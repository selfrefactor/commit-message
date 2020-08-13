import { readJson } from 'fs-extra'
import { resolve } from 'path'

import { parseLighthouse } from './lighthouse'

const resultPath = resolve(__dirname, '../modules/result.json')

test('happy', async () => {
  const { lighthouseResult } = await readJson(resultPath)

  expect(parseLighthouse(lighthouseResult)).toMatchSnapshot()
})
