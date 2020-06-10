import { readJson } from 'fs-extra'
import { resolve } from 'path'

import { parseLoadingExperience } from './loading-experience'

const resultPath = resolve(__dirname, '../modules/result.json')

test('happy', async () => {
  const { loadingExperience } = await readJson(resultPath)

  expect(parseLoadingExperience(loadingExperience)).toMatchSnapshot()
})
