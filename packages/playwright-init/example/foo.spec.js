import { foo } from './foo'
import { wrapTest } from './wrap-test'

test('happy', async () => {
  const evaluateResult = result => {
    expect(result.length).toBeGreaterThan(20)
  }

  await wrapTest(
    await foo(),
    'create.campaign.in.own.favour',
    evaluateResult
  )
})
