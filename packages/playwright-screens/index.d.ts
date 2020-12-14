import { WrapOutput } from "playwright-wrap";

interface Input{
  url: string,
  screensDir?: string,
  waitForTime?: number,
  waitForReady: (_: WrapOutput) => Promise<boolean>,
}

export function playwrightScreens(input: Input): Promise<void>