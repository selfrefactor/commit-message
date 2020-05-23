// READ FOLDER
// ============================================
interface ScanFolderInput{
    folder: string
    excludeFn?: (dir: string) => boolean
    filterFn?: (file: string) => boolean
}

export function scanFolder(input: ScanFolderInput): Promise<Array<string>>

// BENCHMARK
// ============================================
export function createBenchmark(
  input: {
    [key: string]: Array<{
      fn: () => void,
      label: string
    }>
  }    
): void

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

type Single = 'obj' |
  'back' |
  'icon' |
  'big' |
  'icon.tag=foo' |
  'icon.tag=bar' |
  'tag=foo' |
  'tag=bar' |
  ''
  
type Standalone = 'stopspin' | 
  'spin' |
  'sep' |
  'sepx' | 
  'separator' | 
  'separatorx'

export function log(
  inputmode: Standalone | any[] | object | boolean
): void

export function log(
  inputA:any, 
  inputmode: Single
): void

export function log(
  input: string, 
  inputmode: 'box' | 'success' | 'warning' | 'error' | 'info' 
): void

export function log(
  input: object, 
  inputmode: 'pattern' | 'patternx' | 'obj'
): void

export function log(
  inputA:any, 
  inputB:any, 
  inputC:any
): void

export function log(
  inputA:any, 
  inputB:any, 
  inputC:any, 
  inputD:any
): void

export function log(
  inputA:any, 
  inputB:any, 
  inputC:any, 
  inputD:any, 
  inputF:any
): void
