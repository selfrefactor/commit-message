import { readFileSync } from 'fs-extra'
import { log } from 'helpers'
import { replace, inject } from 'rambdax'


import { outputFileSync } from '../_modules/outputFileSync'
import { CONNECT_EPICS_MARKER, IMPORT_EPICS_MARKER } from '../constants'

/**
 * Adds the new epic to the index epic in the current namespace
 * i.e. adds barEpic in foo/epics/index.ts file
 */
export function connectEpic(input: EpicInput) {
  const content = readFileSync(input.indexEpicLocation).toString()
  const [, relativePathRaw] = input.epicLocation.split('epics/')

  const hasImport = content.includes(IMPORT_EPICS_MARKER)
  const hasConnect = content.includes(CONNECT_EPICS_MARKER)

  if (!hasImport || !hasConnect){
    log({ hasImport, hasConnect }, 'pattern')

    return
  }

  /**
   * Same effect is dropLast(3) but with `replace` is
   * easier to see what is meant
   */
  const relativePath = replace('.ts', '', relativePathRaw)
  const from_ = `from './${relativePath}'`
  const import_ = `import { ${input.epicName} }`

  const withImport = inject(
    `\n${import_} ${from_}`,
    IMPORT_EPICS_MARKER,
    content,
  )

  const newContent = inject(
    `\n  ${input.epicName},`,
    CONNECT_EPICS_MARKER,
    withImport,
  )

  outputFileSync(
    input.indexEpicLocation,
    newContent,
  )

  return newContent
}
