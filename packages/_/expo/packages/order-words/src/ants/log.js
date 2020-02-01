import { type } from 'rambdax'

function toString(x){
  if(type(x) === 'Object') return JSON.stringify(x)
  // if(x.toString) return x.toString()
  return `${x}`
}

export function logAnt(input){
  alert(`${type(input)} | ${toString(input)}`)
}

export function logListAnt(...inputsRaw){
  const inputs = inputsRaw.map(
    x => `${type(x)}: ${toString(x)}`
  )
  
  alert(inputs.join(' | '))
}
