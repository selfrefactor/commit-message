import { resolve } from 'path'

import { scanFolder } from './scan-folder.js'
const testDir = resolve(__dirname, '../../src')

test('happy', async () => {
  expect(await scanFolder({ folder : testDir })).toMatchSnapshot()
})

test('with filter', async () => {
  const filterFn = x => x.endsWith('.spec.js')

  expect(await scanFolder({
    folder : testDir,
    filterFn,
  })).toMatchSnapshot()
})

test('with exclude', async () => {
  const excludeFn = dir => dir.endsWith('log')

  expect(await scanFolder({
    folder : testDir,
    excludeFn,
  })).toMatchSnapshot()
})
