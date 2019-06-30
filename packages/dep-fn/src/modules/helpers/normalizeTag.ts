import { tail } from 'rambdax'

export const normalizeTag = (x: string): string => {
  const firstChar = (x as any)[0] * 1

  return Number.isNaN(firstChar) ?
    tail(x) :
    x
}
