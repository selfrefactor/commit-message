const { setter, getter } = require('rambdax')

function initBee(dir){
  setter('DIR', dir)
}

function getDirBee(){
  const found = getter('DIR')

  return found
}

exports.initBee = initBee
exports.getDirBee = getDirBee
