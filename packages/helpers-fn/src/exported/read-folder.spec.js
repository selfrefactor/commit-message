import { resolve } from 'path'
import { readFolder } from './read-folder.js'
const testDir = resolve(__dirname, '../../src')

test('happy', async () => {
  expect(await readFolder({ folder : testDir })).toMatchSnapshot()
})

test('with filter', async () => {
  const filterFn = x => x.endsWith('.spec.js')

  expect(await readFolder({
    folder : testDir,
    filterFn,
  })).toMatchSnapshot()
})

test('with exclude', async () => {
  const excludeFn = dir => dir.endsWith('log')

  expect(await readFolder({
    folder : testDir,
    excludeFn,
  })).toMatchSnapshot()
})
