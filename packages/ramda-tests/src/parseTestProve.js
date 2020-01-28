const input = `
eq(R.clamp(1, 10, 0), 1);
eq(R.clamp(3, 12, 1), 3);
eq(R.clamp(-15, 3, -100), -15);
eq(R.clamp(1, 10, 20), 10);
eq(R.clamp(3, 12, 23), 12);
eq(R.clamp(-15, 3, 16), 3);
eq(R.clamp(1, 10, 4), 4);
eq(R.clamp(3, 12, 6), 6);
eq(R.clamp(-15, 3, 0), 0);
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

void (function parseTest(){
  const content = input.trim()

  if (!content.includes('eq(')) return
  const newContent = content
    .split('\n')
    .map(line => {
      if (!line.includes('eq(')) return removeR(line)

      return parseSingleLine(removeR(line))
    })
    .join('\n')

  // console.log(newContent)

  writeSync(newContent)
})()
