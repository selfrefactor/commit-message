import { ACTION_INTERFACES_MARKER } from './../constants'

export function actionTypingsTemplate(
  actionName: string,
  actionType: string,
  content: string,
): string{

  if (content.includes(`interface ${actionName} {`)){

    return ACTION_INTERFACES_MARKER
  }
  const X = `interface ${actionName} { type: ${actionType}, payload?: any }`

  return `${ACTION_INTERFACES_MARKER}\n${X}`
}
