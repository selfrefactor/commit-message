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
type OnLog = (x: string) => any
interface Exec{
  cwd: string
  command: string
  onLog?: OnLog
}
export function exec(input: Exec) : Promise<string[]>

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
  })
// LOADING BAR
// ============================================
interface LoadingBar{
  numberBars?: number
    step?:number
    symbol?: string
    stopAfter?: number
}
export function startLoadingBar(input: LoadingBar): void 
export function stopLoadingBar(): void 
export function loadingBar(barLength: number): () => string

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
)

export function log(
  inputA:any, 
  inputmode: Single
)

export function log(
  input: string, 
  inputmode: 'box' | 'success' | 'warning' | 'error' | 'info' 
)

export function log(
  input: object, 
  inputmode: 'pattern' | 'patternx' | 'obj'
)

export function log(
  inputA:any, 
  inputB:any, 
  inputC:any
)

export function log(
  inputA:any, 
  inputB:any, 
  inputC:any, 
  inputD:any
)

export function log(
  inputA:any, 
  inputB:any, 
  inputC:any, 
  inputD:any, 
  inputF:any
)
