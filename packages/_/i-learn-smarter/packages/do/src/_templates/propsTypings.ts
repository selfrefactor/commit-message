import {
  camelCase,
  constantCase,
  pascalCase,
} from 'string-fn'
import { INJECT_COMPONENT_MARKER } from './../constants'

/**
 * I declare it here instead of creating a const because of principle
 * 'Don't make me open another file(unless it helps your agenda)'
 */

/**
 * Converts for direct use in tuping.d.ts
 */
function normalizeProps(props: string[]): string {

  return props.map(
    singleProp => `  ${singleProp}`,
  ).join('\n')
}

/**
 * Injects `FooStore, FooProps` interfaces
 *
 * 1st line - marker
 * 2nd line - interface declaration `FooStore`
 * 3rd line - normalized interface props
 * 4th line - closing bracket
 * 5th line - empty line
 * 6th line - props declaration `FooProps`
 * 7th line - connect props to store `fooStore: FooStore`
 * 8th optional line - connect to root store `store: Store`
 */
export function propsTypingsTemplate(
  input: ExtendedComponentInput,
  STORE_PROP: string,
  STORE_INTERFACE: string
): string {

  const MARKER = constantCase(input.name)
  const STORE_INTERFACE_CONTENT = normalizeProps(input.store.interfaceProps)
  const INTERFACE = pascalCase(`${input.name}.props`)
  const ROOT_STORE = input.storeType === 'BOTH' ?
    '  store: Store\n' :
    ''

  const template = `${INJECT_COMPONENT_MARKER}
// ${MARKER}
interface ${STORE_INTERFACE} {
${STORE_INTERFACE_CONTENT}
}

interface ${INTERFACE} extends BaseProps{
  ${STORE_PROP}: ${STORE_INTERFACE}
${ROOT_STORE}}`

  return template
}
