function convertToNum (char: string): number {
  return char.charCodeAt(0) - 97
}

export function sorter(x: string, y: string): number{
  const diff = x.length - y.length

  return diff === 0 ?
    convertToNum(x) - convertToNum(y) :
    diff
}

type Fn = (x: any, y: any) => number

export function sortByProp(prop: string): Fn{

  return (x: any, y: any) => sorter(x[prop], y[prop])
}
