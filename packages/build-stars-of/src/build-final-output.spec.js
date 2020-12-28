import { buildFinalOutput } from './build-final-output'
import { data } from './selfrefactor-rambda-api-data.json'

test('happy', async () => {
  await buildFinalOutput(data)
})