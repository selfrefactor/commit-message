import { Page } from 'playwright'

export type WaitConditionType = 'load' | 'domcontentloaded' | 'networkidle'

type TypeElement = 'div'|'span'|'a'|'button'|'input'|'select'|'textarea'|'img'

interface WaitCondition{
  timeout: number
  waitUntil: WaitConditionType
}

interface GetClassName{
  typeElement: TypeElement
  predicate: (className: string) => boolean
  nth?: number
}

interface WaitForClassName{
  typeElement: TypeElement
  predicate: (className: string) => boolean
  ms?: number
  count?: number
}

interface FindWithTextNth{
  typeElement: TypeElement
  text: string
  nth: number
}

interface FindWithPredicate{
  typeElement: TypeElement
  predicate: (el: HTMLElement) => Promise<boolean>
  nth?: number
}

interface HttpAuth{
  username: string
  password: string
}

interface SlowNetwork{
  offline: boolean
  downloadThroughput: number  
  uploadThroughput: number
  latency: number 
}

interface ServerMock{
  route: string
  path: string
}

interface ExecuteInsideIframe{
  selector: string
  ms?: number
  executeFn: (singleElement: HTMLElement) => Promise<void>
  predicate: (singleElement: HTMLElement) => Promise<boolean>
}

interface ExecuteInsideNamedIframe extends ExecuteInsideIframe{
  frameName: string
}

interface FillInsideIframe{
  text: string
  predicate: (singleElement: HTMLElement) => Promise<boolean>
  selector?: string
  ms?: number
}

interface ClickWith{
  typeElement: TypeElement
  predicate: (prop: string) => boolean
  prop?: 'className'|'id'
  nth?: number
}

interface WrapOutput{
  applyMocks: (serverMocks: Array<ServerMock>) => Promise<void>
  click: (el: string, nth: number) => Promise<void>
  forceClick: (playwrightInput: string) => Promise<void>
  clickAndWaitForNavigation: (playwrightInput: string, navigateEndsWith: string) => Promise<void>
  findWithTextNth: (input: FindWithTextNth) => Promise<HTMLElement>
  findWithPredicate: (input: FindWithPredicate) => Promise<HTMLElement>
  clickWith: (input: ClickWith) => Promise<void>
  clickWithText: (text: string, ms?: number) => Promise<void>
  clickWithTextNth: (input: FindWithTextNth) => Promise<void>
  executeInsideIframe: (input: ExecuteInsideIframe) => Promise<void>
  executeInsideNamedIframe: (input: ExecuteInsideNamedIframe) => Promise<void>
  fillInsideIframe: (input: FillInsideIframe) => Promise<void>
  count: (selector: string) => Promise<number>
  delay: (ms: number) => Promise<void>
  exists: (selector: string) => Promise<boolean>
  getAllClassNames: (typeElement: TypeElement) => Promise<Array<string>>
  getClassName: (input: GetClassName)=> Promise<string>
  goto: (url: string) => Promise<void>
  page: Page
  pressTab: (timesToPress: number) => Promise<void>
  snap: (label?: string, fullPage?: boolean) => Promise<void>
  sleep: () => Promise<void>
  waitAgainst: (playwrightInput: string, count?: number, ms?: number) => Promise<void>
  waitAgainstText: (text: string, ms?: number) => Promise<void>
  waitFor: (playwrightInput: string, count?: number, ms?: number) => Promise<void>
  waitForPredicate: (predicate: () => Promise<boolean>, ms?: number) => Promise<void>
  waitForText: (text: string, ms?: number) => Promise<void>
  waitForAndClick: (playwrightInput: string, nth?: number, ms?: number) => Promise<void>
  waitForClassName: (input: WaitForClassName) => Promise<void>
  waitForLocation: (predicate: (url: string) => boolean, ms?: number) => Promise<void>
}

export function wrap(page: Page, screenDir?: string): WrapOutput
