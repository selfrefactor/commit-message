import { Browser, Page } from 'playwright'

export type WaitConditionType = 'load' | 'domcontentloaded' | 'networkidle'

export type SupportedBrowsers = 'chromium' | 'firefox'

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

interface FindWithText{
  typeElement: TypeElement
  text: string
  nth: number
}

interface ClickWithText extends FindWithText{
  force?: boolean
}

interface FindWithPredicate{
  typeElement: TypeElement
  predicate: (el: HTMLElement) => Promise<boolean>
  nth?: number
}

export interface InputPlaywright{
  extraProps?: object
  resolution?: Resolution
  url?: string
  mobile?: boolean
  browser?: SupportedBrowsers
  headless?: boolean
  fullScreen?: boolean
  waitCondition?: WaitConditionType | WaitCondition 
  logFlag?: boolean
  logAllFlag?: boolean
  logMethod?: (input: object) => void
}

interface ServerMock{
  route: string
  path: string
}

interface AttachOutput{
  applyMocks: (serverMocks: Array<ServerMock>) => Promise<void>
  click: (el: string, nth: number) => Promise<void>
  clickAndWait: (el: string, navigateEndsWith: string) => Promise<void>
  findWithText: (input: FindWithText) => Promise<HTMLElement>
  findWithPredicate: (input: FindWithPredicate) => Promise<HTMLElement>
  clickWithText: (input: ClickWithText) => Promise<void>
  count: (selector: string) => Promise<number>
  exists: (selector: string) => Promise<boolean>
  getAllClassNames: (typeElement: TypeElement) => Promise<Array<string>>
  getClassName: (input: GetClassName)=> Promise<string>
  goto: (url: string) => Promise<void>
  page: Page
  pressTab: (timesToPress: number) => Promise<void>
  snap: (label?: string) => Promise<void>
  waitAgainst: (playwrightInput: string, count?: number, ms?: number) => Promise<void>
  waitFor: (playwrightInput: string, count?: number, ms?: number) => Promise<void>
  waitForAndClick: (playwrightInput: string, nth?: number, ms?: number) => Promise<void>
  waitForClassName: (input: WaitForClassName) => Promise<void>
  waitForLocation: (predicate: (url: string) => boolean, ms?: number) => Promise<void>
}

interface OutputPlaywright{
  page: Page
  browser: Browser
}

interface PlaywrightInstance {
  browser: Browser
  page: Page
}

interface Resolution {
  x: number
  y: number
}

interface PlaywrightSettings{
  args: Array<string>
  pipe?: boolean
  handleSIGINT?: boolean
  ignoreHTTPSErrors?: boolean
  handleSIGTERM?: boolean
  handleSIGHUP?: boolean
  headless: boolean
}

interface TypeSettings{
  selector: string
  text: string
}

type TypeModule = (input: ITypeModule) => Promise<Array<void>>
type ClickModule = (input: IClickModule) => Promise<void>

interface ITypeModule{
  page: Page
  text: string
  selector: string
}

interface IClickModule{
  page: Page
  selector: string
}

type TypeFunction = (input: ITypeModule) => Promise<Array<void>>
type ClickFunction = (input: IClickModule) => Promise<void>

export function initPlaywright(input: InputPlaywright): Promise<OutputPlaywright>
export function attach(page: Page, screenDir?: string): AttachOutput
