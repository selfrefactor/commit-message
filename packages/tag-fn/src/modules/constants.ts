import { NavigationOptions } from 'puppeteer'

export const TIMEOUT = 50000

export const waitForNetwork: NavigationOptions = {
  timeout: TIMEOUT,
  waitUntil: 'networkidle0',
}

export const waitForLoad: NavigationOptions = {
  timeout: TIMEOUT,
  waitUntil: 'load',
}
