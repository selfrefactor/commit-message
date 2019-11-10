import { captureError } from 'capture-error'
import { readFileSync, unlinkSync } from 'fs'
import { resolve } from 'path'
import { defaultTo } from 'rambdax'
import { exec } from './modules/exec'
import { getResult } from './modules/getResult'
import { getText } from './modules/getText'
import { getResultSamostoyatelen } from './samostoyatelen/getResult'

const TEMP_FILE = 'TEMP.txt'

const methods: Methods = {
  SAMOSTOYATELEN: samostoyatelen,
  POZEMLEN: pozemlen,
}

function pozemlen(convertedText: string): string {
  const result = getResult(convertedText)
  const text = getText(result)

  return text
}

function samostoyatelen(convertedText: string): string {

  return getResultSamostoyatelen(convertedText)
}

export async function notary(
  sourceFilePath: string,
  modeRaw?: Mode,
): Promise<string> {
  try {
    const mode = defaultTo('POZEMLEN', modeRaw)
    const cwd = resolve(__dirname, `../files`)
    const tempFilePath = `${cwd}/${TEMP_FILE}`

    const convertCommand = `pdftotext ${sourceFilePath} -raw ${tempFilePath}`
    console.log({convertCommand})
    await exec({
      command: convertCommand,
      cwd: cwd,
    })

    const convertedText = readFileSync(tempFilePath, 'utf8')
    unlinkSync(tempFilePath)

    if (convertedText.length < 100) {
      throw new Error('convertedText.length < 100')
    }

    return methods[mode](convertedText)
  } catch (err) {
    captureError(err, { exitFlag: true })
  }
}

// notary('/home/just/repos/notary/files/pozemlenFirst.pdf').then(console.log)
// notary('/home/just/repos/notary/files/pozemlenSecond.pdf').then(console.log)

// notary('/home/just/repos/notary/files/samostoyatelenObekt.pdf', 'SAMOSTOYATELEN').then(console.log)
