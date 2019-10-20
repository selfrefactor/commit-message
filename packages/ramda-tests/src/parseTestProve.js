const input = `
const v = function(a){ return typeof a === 'number' }
    const ifIsNumber = R.ifElse(v)
    eq(ifIsNumber(t, identity)(15), 16)
    eq(ifIsNumber(t, identity)('hello'), 'hello')

    const fn = R.ifElse(R.gt, R.subtract, R.add)
    eq(fn(2)(7), 9)
    eq(fn(2, 7), 9)
    eq(fn(7)(2), 5)
    eq(fn(7, 2), 5)
`

const { remove, match, drop, init } = require('rambdax')
const { writeSync } = require('clipboardy')

function removeR(line){
  return remove(/R\./g, line)
}

function parseSingleLine(line){
  const [ cleanLine ] = line.split(';')
  const [ firstPart ] = match(/eq\(.+,/, cleanLine)
  if (!firstPart) throw new Error('!firstPart')
  const secondPart = remove(firstPart, cleanLine)

  return `expect(${ init(drop(3, firstPart)) }).toEqual(${ init(secondPart) })`
}

void function parseTest(){
  const content = input.trim()

  if (!content.includes('eq(')) return
  const newContent = content.split('\n').map(line => {
    if (!line.includes('eq(')) return removeR(line)

    return parseSingleLine(removeR(line))
  })
    .join('\n')
  // console.log(newContent)

  writeSync(newContent)
}()

