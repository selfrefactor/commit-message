import { Browser, Page, NavigationOptions } from 'puppeteer'

export type GetWaitCondition = 'load' | 'domcontentloaded' | 'networkidle0'

export type WaitConditions = 'LOAD' | 
  'NETWORK' | 
  'DOM' |
  NavigationOptions

interface ConditionMap{
  [key: string]: GetWaitCondition
}  

export interface InputPuppeteer{
  extraProps?: object
  resolution?: Resolution
  url?: string
  mobile?: boolean
  headless?: boolean
  fullScreen?: boolean
  waitCondition?: WaitConditions
  logFlag?: boolean
}

interface Fn{
  [key: string]: Function
}

interface Tabs{
  before: number
  after: number
}

interface Helpers{
  extractText: (el?: any) => string
}

interface Selector{
  index?: number,
  selector: string
}

interface AttachOutput{
  $$: (selector: string, fn: Function, ...args: any[]) => Promise<any>
  $: (selector: string, fn: Function, ...args: any[]) => Promise<any>
  ctrlA: () => Promise<void>
  helpers: Helpers
  clickAndWaitFor: (firstSelector: Selector, secondSelector: Selector, timeout?: number) => Promise<boolean>
  eval: (input: Selector, fn: (node: HTMLElement) => any) => Promise<any>
  click: (input: Selector) => Promise<boolean>
  clickWithPartialText: (selector: string, text: string) => Promise<boolean>
  clickWithText: (selector: string, text: string) => Promise<boolean>
  count: (selector: string) => Promise<number>
  its: (els: Array<HTMLElement>, prop: string) => Promise<any>
  delay: (ms: number) => Promise<void>
  exists: (selector: string) => Promise<boolean>
  expect: (result: any, expected: any, label: any, complexLabel?: string) => void
  fill(selector: string, text: string): Promise<void>
  match(label: string, updateFlag?: boolean, allowedPixedDiff?: number, threshold?: number): Promise<void>
  focus: (selector: string) => Promise<boolean>
  page: Page
  pressTab: (timesToPress: number) => Promise<void>
  setInput: (selector: string, newValue: string) => Promise<boolean>
  snap: (label: string) => Promise<void>
  typeText: (text: string, step?: number) => Promise<void>
  typeTextWithTab: (text: string, tabs?: Tabs, step?: number) => Promise<void>
  url: () => Promise<string>
  waitAndClick: (input: Selector) => Promise<boolean>
  waitFor: (selector: string, count?: number) => Promise<boolean>
  waitForLocation: (predicate: (url: string, ms?: number) => boolean) => Promise<boolean>

  waitForSelector: (selector: string, timeout?: number) => Promise<boolean>
  waitForSelectors: (selectors: string[]) => Promise<boolean>
}

interface OutputPuppeteer{
  page: Page
  browser: Browser
}

interface PuppeteerInstance {
  browser: Browser
  page: Page
}

interface Resolution {
  x: number
  y: number
}

interface PuppeteerSettings{
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

export function initPuppeteer(input: InputPuppeteer): Promise<OutputPuppeteer>
export function attach(page: Page, screenDir?: string): AttachOutput
export function expect(result: any, expected: any, label: any, complexLabel?: string): void
