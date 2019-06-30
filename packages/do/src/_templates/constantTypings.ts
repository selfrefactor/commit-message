import { CONSTANTS_MARKER } from './../constants'

/**
 * Create constants-like types
 */
export function constantTypingsTemplate(
  actionType: string,
  actionTypeValue: string,
  content: string,
): string{

  if (content.includes(`type ${actionType} =`)){

    return CONSTANTS_MARKER
  }
  const STATEMENT = `type ${actionType} = '${actionTypeValue}'`

  return `${CONSTANTS_MARKER}\n${STATEMENT}`
}
