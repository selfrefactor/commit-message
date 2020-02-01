import { take, put, select } from 'redux-saga/effects'
import { PRESS } from '../../constants'
import { pick, update } from 'rambdax'
import { pressReady } from '../../actions'
import { logAnt } from '../../ants/log'

const selector = state => pick(
  'words,answer,index',
  state.store
)

function whenWrong(pressedWord, words){
  // User press already hidden word
  // ============================================
  if (pressedWord.hide) return {}

  // User press already wrong word
  // ============================================
  if (pressedWord.wrong) return {}

  const newWords = update(
    pressedWord.showIndex,
    {
      ...pressedWord,
      wrong : true,
    },
    words
  )

  return { words : newWords }
}

function whenCorrect(pressedWord, words, index){
  // User press already hidden word
  // ============================================
  if (pressedWord.hide) return {}

  const newWords = update(
    pressedWord.showIndex,
    {
      ...pressedWord,
      hide : true,
    },
    words
  )

  return {
    words    : newWords,
    index    : index + 1,
    // Last answer is pressed
    // ============================================
    showNext : index + 1 === words.length,
  }
}

export function* pressSaga(){
  while (true){
    try {
      const { payload } = yield take(PRESS)
      const {
        words,
        index,
        answer,
      } = yield select(selector)

      const pressedWord = words[ payload ]

      const correct = pressedWord.originalIndex === index
      if (!correct){
        yield put(pressReady(
          whenWrong(pressedWord, words)
        ))
      } else {
        yield put(pressReady(
          whenCorrect(pressedWord, words, index)
        ))
      }
    } catch (err){
      logAnt(err.message)
    }
  }
}
