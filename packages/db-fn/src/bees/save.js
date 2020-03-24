const { ensureDir } = require('fs-extra')
const { getDirBee } = require('./init')
const { snakeCase } = require('string-fn')
const { writeFile } = require('fs')

function rabbit(
  output, data, resolve
){
  const toSave = JSON.stringify(
    data, null, 2
  )

  writeFile(
    output, toSave, () => resolve({
      saved    : data,
      location : output,
    })
  )
}

function saveBee(
  data, label, secondLabel
){
  return new Promise(resolve => {
    const base = `${ getDirBee() }/${ snakeCase(label, true) }`

    if (!secondLabel){
      return rabbit(
        `${ base }.json`, data, resolve
      )
    }

    ensureDir(base, () => rabbit(
      `${ base }/${ snakeCase(secondLabel, true) }.json`,
      data,
      resolve
    ))
  })
}

exports.saveBee = saveBee
