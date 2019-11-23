import { initialGet } from 'client-helpers'
import { randomSeed } from './randomSeed'
import { EMPTY_WORDS, OFF } from '../constants'

let password = initialGet({
  defaultValue: '',
  key: 'joke.maker',
})


export function getInitialState() {
  return {
    status: OFF,
    password,
    seeds: [randomSeed(), randomSeed()],
    words: EMPTY_WORDS
  }
}