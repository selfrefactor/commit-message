import * as opener from 'opener'
import { UNAUTHORIZED } from '../constants'
import { exec } from './exec'
import { normalizeError } from './normalizeError'

export async function webPageTest(url) {
  try {
    if (process.env.WEBPAGETEST_API_KEY === undefined) {
      throw new Error(UNAUTHORIZED)
    }

    const command = `webpagetest --server=https://www.webpagetest.org/ --key=${process.env.WEBPAGETEST_API_KEY} test ${url}`

    const [resultRaw] = await exec({ command, cwd: process.cwd() })
    const result = JSON.parse(resultRaw)

    opener(`https://www.webpagetest.org/result/${result.data.testId}/`)
  } catch (err) {
    throw new Error(normalizeError(err))
  }
}
