import { delay } from 'rambdax'
import { listen } from '../actions'
import { lastWordAnt } from './lastWord'

export async function autoAnt(dispatch: Dispatch, step, pause){
  await delay(2 * step)

  let counter = 0
  while (true){
    counter++
    await delay(step)

    // As I don't want to check for last word in the beginning
    ///////////////////////////
    if (counter > 5 && lastWordAnt()){
      await delay(pause)
      counter = 0
    }

    dispatch(listen('SPACE'))
  }
}
