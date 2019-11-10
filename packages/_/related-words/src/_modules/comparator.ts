function convertToNum (char: string): number {
  return char.charCodeAt(0) - 97
}

export function comparator(x: string, y: string): number{
  const diff = x.length - y.length
  
  return diff === 0 ?
    convertToNum(x) - convertToNum(y) :
    diff  
}
