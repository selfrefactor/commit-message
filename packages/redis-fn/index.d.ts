export interface RedisOptions{
  url?: string
}

export interface SetOptions{
  key:string
  value:string
}

export interface RedisOutput{
  set: (setOptions: SetOptions) => void
  get: (key: string) => Promise<string>
  client: object
}

export function redisFn(options?: RedisOptions) : Promise<RedisOutput>