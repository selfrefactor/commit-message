const boxen = require('boxen')

function box(input){
  console.log(boxen(input, {
    padding     : 1,
    margin      : 0,
    borderStyle : 'bold',
  }))
}

exports.box = box
