import { tail, trim } from 'rambdax';
import { translateNumber } from './translateNumber';

const SEPARATOR = ','
const KURZER = '.'
const NUMBER = '№'

function warningFallback(input: string, label: string){

  return `${input} /_!_${label.toUpperCase()}_!_/`
}

export function normalizeAddress(input: string){
  const [location, zip, ...restRaw] = input.split(SEPARATOR)
  const rest = restRaw.join(SEPARATOR).trim()

  const [strasse, maybeNumber] = restRaw[0].split(NUMBER).map(trim)
  
  /**
   * When somehow NUMBER is missing
   */
  if(maybeNumber === undefined){
    
    return warningFallback(input, 'адрес')
  }

  const street = isNumber ?
    `${strasse} ${maybeNumber}/${translateNumber(Number(maybeNumber))}/` :
    warningFallback(input, 'адрес')

  if(restRaw.length === 1){
    
    return `${location}, ${zip}, ${street}`
  }

  const tailx = tail(restRaw).map(work)

  return [location, zip, street, ...tailx].join(`${SEPARATOR} `) 
}

function isNumber(input: string){
  
  return !Number.isNaN(input as any * 1)
}

function work(input: string){
  const [base , maybeNumber] = input.split(KURZER).map(trim)

  return isNumber(maybeNumber) ?
    `${base}. ${maybeNumber}/${translateNumber(Number(maybeNumber))}/` :
    input.trim()
}