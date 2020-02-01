import {
  applyMiddleware,
  combineReducers,
  createStore as createStoreModule,
} from 'redux'
import createSagaMiddleware from 'redux-saga'
import { store } from '../root/reducers'
import { rootSagas } from '../root/sagas'

const sagaMiddleware = createSagaMiddleware()

export function createStoreBee() {

  const allReducers = combineReducers({
    store,
  })

  const createdStore = createStoreModule(
    allReducers,
      applyMiddleware(sagaMiddleware),
  )

  sagaMiddleware.run(rootSagas)

  return createdStore
}
