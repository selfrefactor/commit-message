import { readFileSync } from 'fs'
import { replace } from 'rambdax'
import { outputFileSync } from '../_modules/outputFileSync'
import { CONNECT_STORES_MARKER, IMPORT_STORES_MARKER } from '../constants'

export function editCombinedReducers(input: ExtendedComponentInput) {
  if(!input.store) return
  const content = readFileSync(input.combinedReducersLocation).toString()

  const importPath = `'../${input.folderName}/reducers'`
  const importEpicStatement = `import { ${input.storeName} } from ${importPath}`
  const importEpic = `${IMPORT_STORES_MARKER}\n${importEpicStatement}`

  const afterImport = replace(IMPORT_STORES_MARKER, importEpic, content)

  const connectStore = `${CONNECT_STORES_MARKER}\n  ${input.storeName},`
  const newContent = replace(CONNECT_STORES_MARKER, connectStore, afterImport)

  outputFileSync(
    input.combinedReducersLocation,
    newContent,
  )

  return newContent
}
