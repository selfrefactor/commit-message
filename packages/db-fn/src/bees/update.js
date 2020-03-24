const { findIndex, update } = require('rambdax')
const { loadJsonBee } = require('./loadJson')
const { saveBee } = require('./save')

function updateBee(newState, label){
  return new Promise(resolve => {
    loadJsonBee(label).then(databaseState => {
      if (!databaseState) return resolve()
      const foundIndex = findIndex(x => x.id === newState.id, databaseState)
      if (foundIndex === -1) return resolve()
      const newDatabaseState = update(
        foundIndex, newState, databaseState
      )
      saveBee(newDatabaseState, label).then(({ saved }) => resolve(saved))
    })
  })
}

exports.updateBee = updateBee
