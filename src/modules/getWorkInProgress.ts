import { readFileSync } from 'fs'
import { resolve } from 'path'

export function getWorkInProgress() {
  const filePath = resolve(__dirname, '../../files/work_in_progress.txt')

  return readFileSync(filePath).toString().trim()
}
