import { Page } from 'puppeteer'
import {
  delay,
  mapAsync,
  split,
} from 'rambdax'

interface TypeInput{
  page: Page
  text: string
  selector: string
}

export async function typeModule(input: TypeInput): Promise<Array<any>>{
  const {page, text, selector} = input
  await page.focus(selector)

  const textAsArray: Array<string> = split('', text)

  return mapAsync(async (char): Promise<void> => {
      await page.keyboard.sendCharacter(char)
      await delay(100)
  }, textAsArray)
}
