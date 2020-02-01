import { take, put, select } from 'redux-saga/effects'
import { NEXT } from '../../constants'
import { pick } from 'rambdax'
import { nextReady } from '../../actions'
import { nextBee } from '../../bees/next'
import { logAnt } from '../../ants/log'

const nextIndexAnt = (list, index) =>
  index + 1 === list.length ? 0 : index + 1

const selector = state => pick(
  'db,currentIndex',
  state.store
)

export function* nextSaga(){
  while (true){
    try {
      yield take(NEXT)
      const { db, currentIndex } = yield select(selector)

      const newCurrentIndex = nextIndexAnt(db, currentIndex)
      const { words, answer } = nextBee(
        db[ newCurrentIndex ]
      )

      yield put(
        nextReady({
          answer,
          currentIndex : newCurrentIndex,
          words,
        })
      )
    } catch (err){
      logAnt(err.message)
    }
  }
}
