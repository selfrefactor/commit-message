import {
  applyMiddleware,
  combineReducers,
  compose,
  createStore as createStoreModule,
} from 'redux'

import createSagaMiddleware from 'redux-saga'

import { rootStore } from './root/reducers'

const reducers = combineReducers({
  rootStore,
})

import rootSagas from './root/sagas'

const composeEnhancers = process.env.NODE_ENV === 'production' ?
  compose :
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__


export function createStore() {
  const sagaMiddleware = createSagaMiddleware()

  const createdStore = createStoreModule(
    reducers,
    composeEnhancers(
      applyMiddleware(sagaMiddleware),
    ),
  )

  sagaMiddleware.run(rootSagas)

  return createdStore
}
