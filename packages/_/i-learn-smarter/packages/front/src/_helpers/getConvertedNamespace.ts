import { last, match, replace } from 'rambdax'

export function getConvertedNamespace(input: string): any {
  const [baseRaw] = match(/:\/\/[a-zA-Z0-9]{2,9}/, input)
  const base = replace('://', '', baseRaw)

  const parts = input.split('/')

  return `${base}_${last(parts)}`
}
