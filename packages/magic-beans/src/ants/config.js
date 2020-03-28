const vscode = require('vscode')

function configAnt(key){
  return vscode
    .workspace
    .getConfiguration('magicBeans')
    .get(key)
}

exports.configAnt = configAnt
