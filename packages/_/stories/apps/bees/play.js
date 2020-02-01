import { delay, waitFor } from 'rambdax'
import { dispatcher } from '../../libs/reduxed'
import { updateDbBee } from './updateDb'

const condition = getState => !getState().loading

const WHEN_TO_FETCH = 12

export async function playBee(getState){
  while (true){
    const { play, subreddit, index, db, marker } = getState()
    if (db.length - index < WHEN_TO_FETCH){
      await updateDbBee(subreddit, marker)
    }

    // Waiting for gif to load
    // ============================================
    const gifLoaded = await waitFor(
      condition,
      5000,
    )(getState)

    if (!gifLoaded) console.log('load.fail', db[ index ].src)

    await delay(play * 1000)
    dispatcher({ type : 'INC_INDEX' })
  }
}
