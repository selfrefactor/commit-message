import { sort } from 'rambdax'

export const getMaxLength = lines => {
  const [ max ] = sort((a, b) => a.length < b.length ? 1 : -1)(lines)

  return max.length
}
