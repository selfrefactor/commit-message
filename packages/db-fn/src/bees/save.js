import {writeFile} from 'fs'
import {snakeCase} from 'string-fn'
import {ensureDir} from 'fs-extra'
import {getDirBee} from './init'

function rabbit(output, data, resolve){
  const toSave = JSON.stringify(data,null, 2)
  
  writeFile(
    output, 
    toSave, 
    () => resolve({saved: data,location: output})
  )
}

export function saveBee(data, label, secondLabel){
  return new Promise(resolve => {
    const base = `${getDirBee()}/${snakeCase(label,true)}`

    if(!secondLabel){
      return rabbit(
        `${base}.json`, 
        data, 
        resolve
      )
    } 
    
    ensureDir(base, ()=> {
      return rabbit(
        `${base}/${snakeCase(secondLabel, true)}.json`, 
        data, 
        resolve
      )
    })
  })
}
