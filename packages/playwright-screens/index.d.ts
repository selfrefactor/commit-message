import {WrapOutput} from 'playwright-wrap'

interface Screen {
  label: string
  screen: {
    x: number
    y: number
  }
}

interface Input {
  url: string
  screens?: Array<Screen>
  screensDir?: string
  waitForTime?: number
  waitForReady?: (_: WrapOutput) => Promise<boolean>
}

export function playwrightScreens(input: Input): Promise<void>
