import {
  applyMiddleware,
  combineReducers,
  compose,
  createStore as createStoreModule,
} from 'redux'
import createSagaMiddleware from 'redux-saga'

import { rootStore } from './root/reducers'

const reducers = combineReducers({ rootStore })

import rootSagas from './root/sagas'

export function createStore(){
  const sagaMiddleware = createSagaMiddleware()

  const createdStore = createStoreModule(reducers,
    compose(applyMiddleware(sagaMiddleware)))

  sagaMiddleware.run(rootSagas)

  return createdStore
}
