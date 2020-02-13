const input = `
it('moves an element from an index to another', function() {
  eq(R.move(0, 1, list), ['b', 'a', 'c', 'd', 'e', 'f']);
  eq(R.move(2, 1, list), ['a', 'c', 'b', 'd', 'e', 'f']);
  eq(R.move(-1, 0, list), ['f', 'a', 'b', 'c', 'd', 'e']);
  eq(R.move(0, -1, list), ['b', 'c', 'd', 'e', 'f', 'a']);
});

it('does nothing when indexes are outside the list outbounds', function() {
  eq(R.move(-20, 2, list), list);
  eq(R.move(20, 2, list), list);
  eq(R.move(2, 20, list), list);
  eq(R.move(2, -20, list), list);
  eq(R.move(20, 20, list), list);
  eq(R.move(-20, -20, list), list);
});
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
