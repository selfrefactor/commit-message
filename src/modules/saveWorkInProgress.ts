import { writeFileSync } from 'fs'
import { resolve } from 'path'

export function saveWorkInProgress(commitMessageValue) {
  const filePath = resolve(__dirname, '../../files/work_in_progress.txt')
  writeFileSync(filePath, commitMessageValue)
}
