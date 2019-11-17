import { last, split } from 'rambdax'

export function getNumberOfStreet(address: string): number | string {
  const shouldBeNumber = last(split('№', address)).trim()
  const isNumber = !Number.isNaN(Number(shouldBeNumber))

  return isNumber ?
    Number(shouldBeNumber) :
    shouldBeNumber
}
