const input = `
eq(R.values(null), []);
eq(R.values(undefined), []);
eq(R.values(55), []);
eq(R.values('foo'), []);
eq(R.values(true), []);
eq(R.values(false), []);
eq(R.values(NaN), []);
eq(R.values(Infinity), []);
eq(R.values([]), []);
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

