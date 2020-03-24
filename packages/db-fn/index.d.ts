interface Push<T>{
    newState: Array<T>
    location: string
}
interface Save<T>{
    saved: T
    location: string
}
export function init(dir: string): void

export function loadKeys(label: string, secondLabel?: string): Promise<Array<string>>

export function load<T>(id: string, label: string): Promise<T>

export function loadAll<T>(label: string): Promise<Array<T>>

export function loadJson<T>(label: string, secondLabel?: string): Promise<T>

export function push<T>(data: T, label: string): Promise<Push<T>>

export function save<T>(data: T, label: string, secondLabel?: string): Promise<Save<T>>

export function update<T>(newState: T, label: string): Promise<Array<T>>

export function remove<T>(id: string, label: string): Promise<boolean>