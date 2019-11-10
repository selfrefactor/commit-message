import { captureError } from 'capture-error'
import { readFileSync, unlinkSync } from 'fs'
import { resolve } from 'path'
import { exec } from './modules/exec'
import { getResult } from './modules/getResult'
import { getText } from './modules/getText'
import { getResultSamostoyatelen } from './samostoyatelen/getResult'
const TEMP_FILE = 'TEMP_SAMOSTOYATELEN.txt'

export async function notary(sourceFilePath: string): Promise<void> {
  try {
    const cwd = resolve(__dirname, `../files`)
    const tempFilePath = `${cwd}/${TEMP_FILE}`

    const convertedText = readFileSync(tempFilePath, 'utf8')
    if (convertedText.length < 100) {
      throw new Error('convertedText.length < 100')
    }
    const result = getResultSamostoyatelen(convertedText)
    let a
  } catch (err) {
    captureError(err, { exitFlag: true })
  }
}

notary('/home/just/repos/notary/files/samostoyatelenObekt.pdf').then(console.log)
