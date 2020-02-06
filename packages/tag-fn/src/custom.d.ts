import { Browser, Page } from 'puppeteer'

export interface IPuppeteer {
  browser: Browser
  page: Page
}

export interface IGetTagValue {
  page: Page
  tag: string
}
