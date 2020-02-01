export function getInputAnt(currentInstance: any, part: string): string {

  return currentInstance[part] ? currentInstance[part] : ''
}
