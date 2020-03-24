const { range, head, shuffle } = require('rambdax')

const charCodes = [ ...range(49, 57), ...range(65, 90), ...range(97, 122) ]

const loops = range(0, 8)

function uuidAnt(){
  return loops
    .map(x => String.fromCharCode(head(shuffle(charCodes))))
    .join('')
}

exports.uuidAnt = uuidAnt
