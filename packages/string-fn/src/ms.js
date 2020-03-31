function parseInput(inputRaw){
  if (typeof inputRaw !== 'string') throw new Error('inputRaw !== string')

  const numbers = []
  const chars = []
  let flag = false

  inputRaw.split('').forEach(x => {
    if (flag && x){

      chars.push(x)
    } else if (!flag){

      const isNumber = Number(x) === Number(x)

      if (isNumber){

        numbers.push(x)
      } else {

        chars.push(x)
        flag = true
      }

    } else {

      flag = true
    }
  })

  return {
    numbers : Number(numbers.join('')),
    chars   : chars.join(''),
  }
}

const hash = {
  1     : [ 's', 'seconds', 'second', 'sec' ],
  60    : [ 'm', 'minutes', 'minute', 'min' ],
  3600  : [ 'h', 'hours', 'hour' ],
  86400 : [ 'd', 'days', 'day' ],
}

function findInHash(hashKey){
  const [ found ] = Object.keys(hash).filter(singleKey => hash[ singleKey ].includes(hashKey))

  if (!found) throw new Error('no numbers passed to `ms`')

  return found
}

export function ms(inputRaw){
  const input = parseInput(inputRaw)

  const miliseconds = findInHash(input.chars)

  return Math.floor(Number(miliseconds) * 1000 * input.numbers)
}
