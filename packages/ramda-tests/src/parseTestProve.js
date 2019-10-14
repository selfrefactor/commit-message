const input = `
eq(R.add('1', '2'), 3);
eq(R.add(1, '2'), 3);
eq(R.add(true, false), 1);
eq(R.add(null, null), 0);
eq(R.add(undefined, undefined), NaN);
eq(R.add(new Date(1), new Date(2)), 3);
`

const {writeSync}= require('clipboardy');
const { remove, match, drop, init } = require('rambdax')

function removeR(line){
  return remove(/R\./g, line)
}

function parseSingleLine(line){
  const [cleanLine] = line.split(';')
  const [firstPart] = match(/eq\(.+,/, cleanLine)
  if(!firstPart) throw new Error('!firstPart')
  const secondPart = remove(firstPart, cleanLine)
  return `expect(${drop(3, firstPart)}).toEqual(${init(secondPart)})`
}

void function parseTest(){
  const content = input.trim();
  
  if(!content.includes('eq(')) return
  const newContent = content.split('\n').map(line => {
    if(!line.includes('eq(')) return removeR(line)
    return parseSingleLine(removeR(line))  
  }).join('\n')
  // console.log(newContent)

  writeSync(newContent)
}()
 
