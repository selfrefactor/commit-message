const { existsSync, readdir } = require('fs')
const { getDirBee } = require('./init')
const { loadJsonBee } = require('./loadJson')
const { remove } = require('rambdax')
const { snakeCase } = require('string-fn')

function loadAllBee(label){
  return new Promise(resolve => {
    const dir = `${ getDirBee() }/${ snakeCase(label, true) }`

    if (!existsSync(dir)) return resolve()

    readdir(dir, (_, dirData) => {
      const promised = dirData.map(x =>
        loadJsonBee(label, remove('.json', x)))
      Promise.all(promised).then(resolve)
    })
  })
}

exports.loadAllBee = loadAllBee
