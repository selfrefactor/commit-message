import { getInitURL } from '../src/modules/getInitURL'

test('when there is such tag', async () => {
  const dependency = 'beautify-benchmark'
  const result = await getInitURL(dependency)

  expect(
    result,
  ).toEqual('https://github.com/Fishrock123/beautify-benchmark')
})
