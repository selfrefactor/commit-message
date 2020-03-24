const { existsSync, readdir } = require('fs')
const { getDirBee } = require('./init')
const { remove, maybe } = require('rambdax')
const { snakeCase } = require('string-fn')

function loadKeysBee(label, secondLabel){
  return new Promise(resolve => {
    const actualLabel = maybe(
      secondLabel === undefined,
      () => snakeCase(label, true),
      () => snakeCase(label, true) + '/' + snakeCase(secondLabel, true)
    )

    const dir = getDirBee() + '/' + actualLabel
    if (!existsSync(dir)) return resolve()

    readdir(dir, (_, dirData) => {
      const parsed = dirData.map(remove('.json'))
      resolve(parsed)
    })
  })
}

exports.loadKeysBee = loadKeysBee
