import { InputPuppeteer } from 'init-puppeteer'

export const puppeteerSettings: InputPuppeteer = {
  headless: process.env.DEBUG !== 'true',
  url: 'about:blank',
}
