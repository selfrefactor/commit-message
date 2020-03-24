const { loadJsonBee } = require('./loadJson')

function loadBee(id, label){
  return new Promise(resolve => {
    loadJsonBee(label).then(content => {
      if (!content) return resolve()
      const found = find(x => x.id === id, content)

      resolve(found)
    })
  })
}
exports.loadBee = loadBee
