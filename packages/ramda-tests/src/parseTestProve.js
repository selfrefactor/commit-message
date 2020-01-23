const input = `
eq(R.toggle(['on', 'off', 'neither'], 'on'), 'off');
    eq(R.toggle(['on', 'off', 'neither'], 'off'), 'on');
    eq(R.toggle(['on', 'off', 'neither'], 'neither'), 'neither');

    eq(R.toggle(['active', 'inactive', 'neither'], 'inactive'), 'active');
    eq(R.toggle(['active', 'inactive', 'neither'], 'active'), 'inactive');
    eq(R.toggle(['active', 'inactive', 'neither'], 'neither'), 'neither');

    eq(R.toggle([10, 100, 50], 10), 100);
    eq(R.toggle([10, 100, 50], 100), 10);
    eq(R.toggle([10, 100, 50], 50), 50);
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
