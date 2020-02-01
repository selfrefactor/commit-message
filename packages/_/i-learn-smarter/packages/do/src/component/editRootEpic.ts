import { readFileSync } from 'fs'
import { replace } from 'rambdax'
import { log } from 'log'
import { camelCase } from 'string-fn'

import { outputFileSync } from '../_modules/outputFileSync'
import { CONNECT_EPICS_MARKER, IMPORT_EPICS_MARKER } from './../constants'

export function editRootEpic(input: ExtendedComponentInput): void {
  const content = readFileSync(input.rootEpicLocation).toString()
  
  const hasImport = content.includes(IMPORT_EPICS_MARKER)
  const hasConnect = content.includes(CONNECT_EPICS_MARKER)
  const ok = hasImport && hasConnect
  
  if(!ok) return log({ok, _:editRootEpic.name}, 'pattern')

  const epicName = camelCase(`${input.name}.epic`)
  const importPath = `'../../${input.folderName}/epics/'`

  const importEpicStatement = `import { ${epicName} } from ${importPath}`
  const importEpic = `${IMPORT_EPICS_MARKER}\n${importEpicStatement}`
  const afterImport = replace(IMPORT_EPICS_MARKER, importEpic, content)

  const connectEpic = `${CONNECT_EPICS_MARKER}\n  ${epicName},`
  const newContent = replace(CONNECT_EPICS_MARKER, connectEpic, afterImport)

  outputFileSync(
    input.rootEpicLocation,
    newContent,
  )
}
