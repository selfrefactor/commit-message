import {
  head,
  join,
  map,
  split,
  tail,
  toLower,
  toUpper,
} from 'rambdax'

const longCityMap = {
  'В.Търново': 'Велико Търново',
  'Ст.Загора': 'Стара Загора',
}

export function titleCase(str): string {

  const willReturn = join(
    ' ',
    map(
      val => `${toUpper(head(val))}${toLower(tail(val))}`,
      split(' ', str),
    ),
  )

  const condition = Object.values(longCityMap).indexOf(willReturn) 

  return condition === -1 ?
    willReturn :
    Object.keys(longCityMap)[condition]
}
