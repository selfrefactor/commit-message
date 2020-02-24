import { findIndex, update } from 'rambdax'
import { loadJsonBee } from './loadJson'
import { saveBee } from './save'

export function updateBee(newState, label){
  return new Promise(resolve => {
    loadJsonBee(label)
      .then(databaseState => {
        if (!databaseState) return resolve()
        const foundIndex = findIndex(
          x => x.id === newState.id,
          databaseState
        )
        if (foundIndex === -1) return resolve()
        const newDatabaseState = update(
          foundIndex,
          newState,
          databaseState
        )
        saveBee(newDatabaseState, label)
          .then(
            ({ saved }) => resolve(saved)
          )
      })
  })
}
