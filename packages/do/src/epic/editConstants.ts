import { readFileSync } from 'fs-extra'
import { constantCase } from 'string-fn'

import { log } from 'helpers'
import { replace } from 'rambdax'
import { outputFileSync } from '../_modules/outputFileSync'

/**
 * Add `constantName` after the respective marker, i.e. below `// FOO`
 */
export function editConstants(input: EpicInput): void {
  const content = readFileSync(input.constantsLocation).toString()

  const marker = `// ${constantCase(input.folder)}`
  const statement = `export const ${input.constantName} = '${input.constantValue}'`
  const includeStatement = content.includes(statement)
  const includeMarker = content.includes(marker)

  if (includeStatement || !includeMarker) {
    log({includeStatement, includeMarker}, 'pattern')

    return
  }

  const injection = `${marker}\n${statement}`

  const newContent = replace(
    marker,
    injection,
    content,
  )

  outputFileSync(
    input.constantsLocation,
    newContent,
  )
}
