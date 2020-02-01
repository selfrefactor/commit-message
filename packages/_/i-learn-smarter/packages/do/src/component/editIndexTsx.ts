import { readFileSync } from 'fs'
import { match, replace } from 'rambdax'
import { kebabCase, pascalCase } from 'string-fn'
import { outputFileSync } from '../_modules/outputFileSync'
import { COMPONENTS_MARKER, ROUTES_MARKER } from './../constants'

export function editIndexTsx(input: ComponentInput): void {
  let content = readFileSync(input.indexTsxLocation).toString()

  const componentName = pascalCase(`${input.name}.wrapped`)
  const importLocation = `'./${input.folderName}/component'`

  const importStatement = `import { ${componentName} } from ${importLocation}`
  const importComponent = `${COMPONENTS_MARKER}\n${importStatement}`

  content = replace(
    COMPONENTS_MARKER,
    importComponent,
    content,
  )

  const path = kebabCase(input.name)
  const paddingLength = getPadding(content)

  const padding = Array(paddingLength).fill(' ').join('')

  const pad = `\n  ${padding}`
  const padShort = `\n${padding}`
  
  const a = `<Route${pad}component={${componentName}}`
  const b = `exact={true}${pad}path='/${path}'${padShort}/>`

  const route = `${a}${pad}${b}`
  const createRoute = `${ROUTES_MARKER}${padShort}${route}`

  content = replace(
    ROUTES_MARKER,
    createRoute,
    content,
  )

  outputFileSync(
    input.indexTsxLocation,
    content,
  )
}

function getPadding(content: string){
  const [line] = match(/.+{\/\* ROUTES_MARKER \*\/}/, content)
  const padding = replace(ROUTES_MARKER, '', line)

  return padding.length
}