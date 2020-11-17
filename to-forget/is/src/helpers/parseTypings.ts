import { head, match } from 'rambdax'

const START_OF_INTERFACE = 'interface'
const END_OF_INTERFACE = '}'
const DESCRIPTION_SPLITTER = ':'
const OPTIONAL_DESCRIPTION_SPLITTER = '?:'

function getInterfaceName(singleLine: string) {
  const matched = match(/[A-Z][A-Za-z]+/g, singleLine)
  
  return head(matched)
}

function getDescription(singleLine: string): DescriptionOutput {

  const isOptional = singleLine.includes(OPTIONAL_DESCRIPTION_SPLITTER)

  const [key, value] = singleLine
    .split(DESCRIPTION_SPLITTER)
    .map(x => x.trim())

  const [strictKey, strictValue] = singleLine
    .split(OPTIONAL_DESCRIPTION_SPLITTER)
    .map(x => x.trim())

  /**
   * return `false` for either [key,value] if_
   * the property is optional as in this case_
   * this property is skipped
   */
  return {
    key: isOptional ? false : key,
    strictKey: isOptional ? strictKey : key,
    strictValue: isOptional ? strictValue : value,
    value: isOptional ? false : value,
  }
}

/**
 * Convert typings content to individual interfaces
 */
export function parseTypings(typingsContent: string): InitResult {
  const splitted = typingsContent.split('\n')
  const cleaned = splitted.filter(
    singleLine => !singleLine.startsWith('//')
  )

  let interfaceFlag = false
  let interfaceNameHolder = ''
  
  const interfaces = {}
  const allInterfaces = {}

  splitted.forEach(singleLine => {
    /**
     * On end of interface disable the flag
     */
    if (singleLine.trim() === END_OF_INTERFACE && interfaceFlag) {

      interfaceFlag = false
      interfaceNameHolder = ''

      return
    }

    /**
     * Catching the name of the interface_
     * and enabling the flag
     */
    if (
      singleLine.startsWith('interface') || 
      singleLine.startsWith('export interface')
    ) {

      interfaceNameHolder = getInterfaceName(singleLine)
      interfaces[interfaceNameHolder] = {}
      allInterfaces[interfaceNameHolder] = {}
      interfaceFlag = true

      return
    }

    /**
     * Take interface description
     */
    if (interfaceFlag) {

      const {
        key,
        strictKey,
        strictValue,
        value,
      } = getDescription(singleLine.trim())

      if (key !== false) {

        interfaces[interfaceNameHolder][key] = value
      }

      allInterfaces[interfaceNameHolder][strictKey] = strictValue
    }

  })

  return { interfaces, allInterfaces }
}
