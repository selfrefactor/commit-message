type Single = 'obj' |
  'back' |
  'icon' |
  'icon.tag=foo' |
  'icon.tag=bar' |
  'tag=foo' |
  'tag=bar' |
  'spin' |
  ''
  
type Standalone = 'stopspin' | 
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