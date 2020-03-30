const clipboardy = require('clipboardy')
const { map } = require('rambdax')
const { readFileSync } = require('fs')
const { resolve } = require('path')
const FILE = resolve(__dirname, '../../clipboards.json')

function log(clipboards){
  map((x, prop) => console.log(`${ prop } : ${ x.trim() }`), clipboards)
}

async function copyToClipboard(label){
  const clipboards = JSON.parse(readFileSync(FILE).toString())
  const maybe = clipboards[ label ]

  if (!maybe){
    return label === 'help' ?
      log(clipboards) :
      console.log(`No such label '${ label }'`)
  }

  clipboardy.writeSync(maybe)
}

exports.copyToClipboard = copyToClipboard
