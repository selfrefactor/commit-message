import { wrapTest } from './wrap-test';
import { foo } from './foo';

test('happy', async () => {
  const evaluateResult = result => {
    expect(result.length).toBeGreaterThan(20)
  }
  
  await wrapTest(await foo(), 'create.campaign.in.own.favour', evaluateResult);
});
