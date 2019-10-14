const input = `
eq(R.allPass([odd, gt5, plusEq]).length, 4);
    eq(R.allPass([odd, gt5, plusEq])(9, 9, 9, 9), true);
    eq(R.allPass([odd, gt5, plusEq])(9)(9)(9)(9), true);
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

