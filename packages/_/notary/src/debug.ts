import { readFileSync } from 'fs'
import { resolve } from 'path'
import { getResultSamostoyatelen } from './samostoyatelen/getResult'
const TEMP_FILE = 'TEMP_SAMOSTOYATELEN.txt'

export async function notary(): Promise<void> {
    const cwd = resolve(__dirname, `../files`)
    const tempFilePath = `${cwd}/${TEMP_FILE}`

    const convertedText = readFileSync(tempFilePath, 'utf8')
    if (convertedText.length < 100) {
      throw new Error('convertedText.length < 100')
    }
    const result = getResultSamostoyatelen(convertedText)
    console.log(result)
}

notary().then(console.log)
