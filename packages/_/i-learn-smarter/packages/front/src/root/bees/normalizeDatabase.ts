import { allTrue, filter, pluck } from 'rambdax'
const MIN = 2

function check(x: any){
  return (prop: string) => {
    return typeof x[prop] === 'string' && x[prop].length > MIN
  }
}

export function normalizeDatabaseBee(input: any): DBInstance[] {
  const plucked = pluck<DBInstance>('doc', input)

  return filter((x: DBInstance) => {
    const checker = check(x)
    return allTrue(
      checker('dePart'),
      checker('deWord'),
      checker('enPart'),
      checker('enPart'),
      checker('imageSrc'),
    )
  }, plucked)
}
