// READ FOLDER
// ============================================
interface ScanFolderInput{
    folder: string
    excludeFn?: (dir: string) => boolean
    filterFn?: (file: string) => boolean
    maxDepth?: number
}

export function scanFolder(input: ScanFolderInput): Promise<Array<string>>

// Monitor
// ============================================
export class Monitor {
  setInitialState: () => Promise<void>
  start: () => Promise<void>
  stop: () => Promise<object>
}
type monitorType = {
  start: () => Promise<void>
  stop: () => Promise<object>
}
export const monitor: monitorType
// Utils
// ============================================
type DefaultToMode = 'default' | 'onoff' |'number'

export function defaultTo(processEnvKey: string, defaultValue: string): string 
export function defaultTo(processEnvKey: string, defaultValue: string, mode: 'default'): string 
export function defaultTo(processEnvKey: string, defaultValue: boolean, mode: 'onoff'): boolean 
export function defaultTo(processEnvKey: string, defaultValue: number, mode: 'number'): number 

// BENCHMARK
// ============================================
export function createBenchmark(
  input: {
    [key: string]: Array<{
      fn: () => void,
      label: string
    }>
  }    
): Promise<object>

export function createComplexBenchmark(
    input: Array<{
      suites: Array<{
        fn: () => void,
        label: string
      }>
      label: string
    }>
): Promise<object>

// HJSON
// ============================================
export function parseHjson(filePath: string) : Promise<object>

// TRANSLATE
// ============================================
export function translate(text: string) : Promise<string>
export function translateToBulgarian(text: string) : Promise<string>
export function translateToGerman(text: string) : Promise<string>

// EXEC
// ============================================
type OnLog = (x: string) => void
interface Exec{
  cwd: string
  command: string
  onLog?: OnLog
}
interface Spawn extends Exec{
  inputs: string[]
}
export function exec(input: Exec) : Promise<string[]>
export function execSafe(input: Omit<Exec, 'onLog'>) : Promise<string>
export function spawn(input: Spawn) : Promise<string>

// Run tests
// ============================================
interface SingleRunTest {
  label?: string
  match?: any
  ok?: any
  fail?: any
  danger?: any
}
export function runTests(input: {
    label: string,
    data: Array<SingleRunTest>,
    fn: (input: any) => void,
  }, options?: {
    async?: boolean,
    logFlag?: boolean,
    callback?: () => void,
  }) : void

// LOG
// ============================================

type LogModes = 'obj' |
  'back' |
  'back.foo' |
  'back.bar' |
  'back.baz' |
  'back.random' |
  'big' |
  'foo' |
  'bar' |
  'baz' |
  'random' |
  'box' |
  'info' |
  'success' |
  'warning' |
  'error' |
  'obj'
  
type StandaloneLogModes = 'sep' |
  'sepx' | 
  'separator' | 
  'separatorx'

export function log(
  inputmode: StandaloneLogModes
): void

export function log(
  toLog: any,
  inputmode: LogModes
): void
