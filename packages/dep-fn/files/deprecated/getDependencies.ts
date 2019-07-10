import { getDependencies } from '../src/modules/helpers/getDependencies'

it('', async () => {
  const result = await getDependencies()
  expect(
    result.dependencies,
  ).toBeTruthy()

  expect(
    result.devDependencies,
  ).toBeTruthy()
})
