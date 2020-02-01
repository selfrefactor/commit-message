import { tail } from 'rambdax'
import { ActionsObservable } from 'redux-observable'
import { Observable } from 'rxjs/Observable'
import { maskSentence, maskWords } from 'string-fn'

import { getNextIndex } from '../../_helpers/getNextIndex'
import { glueRelated } from '../../_helpers/glueRelated'
import { sharedNextReadyBee } from '../../bees/sharedNextReady'
import { GUESS_WORD_NEXT } from '../../constants'
import { nextReady } from '../actions'

const capitalizeFirst = (x: string): string => {
  const first = x[0].toUpperCase()
  const second = tail(x)

  return `${first}${second}`
}

const createWords = (word, sentence) => {
  const [wordAnswer] = word.split(',')

  const wordQuestion = maskWords({
    charLimit: 4,
    words: wordAnswer,
  })

  const splitted = wordAnswer.split(' ')
  const ok = !(splitted.length === 1 && !sentence.includes(wordAnswer))

  const words = ok ?
    splitted :
    [capitalizeFirst(splitted[0])]

  return {
    wordAnswer,
    wordQuestion,
    words,
  }
}

function createInstance(store: ObservableStore): any {
  const { fromLanguage, toLanguage } = store.getState().store
  const { db, currentIndex } = store.getState().guessWordStore

  const newIndex = getNextIndex({ length: db.length, index: currentIndex })
  const currentInstance = db[newIndex]
  sharedNextReadyBee(currentInstance)

  const relatedKey = `${fromLanguage.toLowerCase()}Related`
  const wordKey = `${fromLanguage.toLowerCase()}Word`
  const key = `${fromLanguage.toLowerCase()}Part`
  const translatedKey = `${toLanguage.toLowerCase()}Part`

  const related = glueRelated(currentInstance[relatedKey])
  const sentence = currentInstance[key]

  const {
    wordAnswer,
    wordQuestion,
    words,
  } = createWords(currentInstance[wordKey], sentence)

  const translated = currentInstance[translatedKey]
  const { hidden, visible } = maskSentence({ sentence, words })

  const question = visible.join(' ')
  const answer = hidden.join(' ')

  const normalizedCurrentInstance: DataPattern = {
    fromPart: sentence,
    fromWord: '',
    imageSrc: currentInstance.imageSrc as string,
    toPart: '',
    toWord: '',
  }

  const payload = {
    answer,
    currentIndex: newIndex,
    currentInstance: normalizedCurrentInstance,
    question,
    related,
    translated,
    wordAnswer,
    wordQuestion,
  }

  return payload
}

export const nextEpic = (
  action$: ActionsObservable<GuessWordNextAction>,
  store: ObservableStore,
): Observable<Action> =>
  action$
    .ofType(GUESS_WORD_NEXT)
    .map(() => nextReady(createInstance(store)))
