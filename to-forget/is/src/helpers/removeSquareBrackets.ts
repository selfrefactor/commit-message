import { replace } from 'rambdax'

export function removeSquareBrackets(schema: string): string {
  return replace(
    /\[|\]/g,
    '',
    schema,
  )
}
