# client-helpers

## Install

`yarn add https://github.com/selfrefactor/client-helpers#0.1.0`

## Typings

```
type BunnyTypes = 'number' | 'boolean' | 'object' | 'string'

interface InitialGet<T> {
  key: string
  defaultValue: T
}

export function getRabbit<T>(key: string, typeBunny?: BunnyTypes) : T
export function initialGetRabbit<T>(input: InitialGet<T>) : T
export function normalizeRabbit<T>(raw: any, typeBunny: BunnyTypes) : T

export function push<T>(key: string, value: T): void
export function setter<T>(key: string, value: T): void
export function masterSetter<T>(newState: T): void
export function masterReset(): void
export function initLocalState<T>(masterKey: string, maybeObject?:T): void

export function getter<T>(key: string): T
export function masterGetter<T>(): T
export function resetter<T>(keys: string[], extraFlag?:boolean): T
export function getterAnt<T>(hash: any): T
export function getterAntReset<T>(hash: any): T
```