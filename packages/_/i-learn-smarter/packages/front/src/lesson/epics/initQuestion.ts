import { allTrue, match, test } from 'rambdax'
import { ActionsObservable } from 'redux-observable'
import { Observable } from 'rxjs/Observable'
import { LESSON_NEXT } from '../../constants'
import { questionReady } from '../actions'
import { questionListBee } from '../bees/questionList'

const hasExample = store => {
  return store.getState().lessonStore.currentStep.example
}

function isComplexExampleFn(input){
  const matched = match(/\[([A-Za-z\.\]\[])*/g, input)

  return matched.filter(x => x.includes('.')).length > 0
}

const work = (store: ObservableStore) => {
  const {currentStep } = store.getState().lessonStore
  const isExample = currentStep.example.includes('[')
  const isComplexExample = allTrue(
    isExample,
    isComplexExampleFn(currentStep.example),
  )
  const words = currentStep.example.split(' ')
  const parsedWords = words.map(singleWord => {
    if (!test(/\[.*\]/, singleWord)) return singleWord

    return questionListBee(singleWord, isComplexExample)
  })

  return questionReady(parsedWords)
}

export const initQuestionEpic = (
  action$: ActionsObservable<LessonNextAction>,
  store: ObservableStore,
): Observable<Action> =>
  action$
    .ofType(LESSON_NEXT)
    .filter(() => hasExample(store))
    .map(() => work(store))
