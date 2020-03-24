const { getDirBee } = require('./init')
const { snakeCase } = require('string-fn')
const { uuidAnt } = require('../ants/uuid')
const { writeFile, readFileSync, existsSync } = require('fs')

function pushBee(data, label){
  return new Promise((resolve, reject) => {
    try {
      const output = `${ getDirBee() }/${ snakeCase(label, true) }.json`
      const currentState = existsSync(output) ?
        JSON.parse(readFileSync(output).toString()) :
        []
      const id = uuidAnt()
      currentState.push({
        ...data,
        id,
      })

      writeFile(
        output, JSON.stringify(
          currentState, null, 2
        ), () =>
          resolve({
            id,
            location : output,
            newState : currentState,
          })
      )
    } catch (e){
      console.log('push bee')
      reject(e)
    }
  })
}

exports.pushBee = pushBee
