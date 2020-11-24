type BunnyTypes = 'number' | 'boolean' | 'object' | 'string'
type LocalizeTypes = 'number' | 'boolean' | 'object' | 'string' | 'array'

interface InitialGet<T> {
  key: string
  defaultValue: T
}

interface InitialGetUrl<T> extends InitialGet<T> {
  urlKey: string
}

export function getTypeless<T>(key: string) : T
export function getLocalize<T>(key: string, forceType?: LocalizeTypes) : T
export function setLocalize(key: string, value: any) : void
export function initialGetLocalize<T>(input: InitialGet<T>) : T
export function initialGetLocalizeUrl<T>(input: InitialGetUrl<T>) : T
export function normalizeLocalize<T>(rawInput: any, forceType?: LocalizeTypes) : T
export function returnNormalized<T>(rawInput: any) : T


export function push<T>(key: string, value: T): void
export function pushUniq<T>(key: string, value: T): void
export function setter<T>(key: string, value: T): void
export function masterSetter<T>(newState: T): void
export function masterReset(): void
export function initLocalState<T>(masterKey: string, maybeObject?:T): void

export function getter<T>(key: string): T
export function masterGetter<T>(keys?: string|string[]): T
export function resetter<T>(keys: string[]|string, extraFlag?:boolean): T
export function getterAnt<T>(hash: any): T
export function getterAntReset<T>(hash: any): T