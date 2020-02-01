export function putAheadAnt(list: any, index: any){
  if (index < 1) { return list }

  const [first, target] = [list[0], list[index]]
  list[0] = target
  list[index] = first

  return list
}
