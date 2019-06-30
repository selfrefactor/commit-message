import { InputPuppeteer } from 'init-puppeteer/typings'

export const puppeteerSettings: InputPuppeteer = {
  headless: process.env.DEBUG !== 'true',
  url: 'about:blank',
}
