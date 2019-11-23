import { shuffle, take } from 'rambdax'

const list = 'qwertysadfdgfxczbvcnbv231765987'.split('')

export function randomSeed(){
  
  return take(7,shuffle(list)).join('')
}