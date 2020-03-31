import { glob } from './glob'

test('', () => {
  expect(glob('/home/dev/foo.js', '*.js')).toEqual(true)
  expect(glob('/home/dev/foo.js', '*.ts')).toEqual(false)
  expect(glob('/home/dev/foo.js', '/home/*')).toEqual(true)
  expect(glob('/home/dev/foo.js', '*/dev/foo*')).toEqual(true)
})

test('too many stars', () => {
  expect(glob('/home/dev/foo.js', '**/dev/foo*')).toEqual(false)
})
