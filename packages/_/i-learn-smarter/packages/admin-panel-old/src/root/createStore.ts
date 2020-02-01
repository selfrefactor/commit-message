import {
  applyMiddleware,
  combineReducers,
  compose,
  createStore as createStoreModule,
} from 'redux'

import { connectRouter, routerMiddleware } from 'connected-react-router'
import { createBrowserHistory } from 'history'
import createSagaMiddleware from 'redux-saga'

import { notifyStore } from 'notify/reducers'
import { notifySagas } from 'notify/sagas'

import { adminInsertStore } from '../admin_insert/reducers'
import { adminRepairStore } from '../admin_repair/reducers'
import { singleInsertStore } from '../single_insert/reducers'
import { store } from './reducers'

import { adminInsertSagas } from '../admin_insert/sagas'
import { adminRepairSagas } from '../admin_repair/sagas'
import { singleInsertSagas } from '../single_insert/sagas'
import { rootSagas } from './sagas'

export const history = createBrowserHistory()
const ok = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ !== undefined

const composeEnhancers = ok ?
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ :
  compose

export function createStore() {
  const sagaMiddleware = createSagaMiddleware()

  const mainReducers = combineReducers({
    adminInsertStore,
    adminRepairStore,
    notifyStore,
    singleInsertStore,
    store,
  })

  const willReturn: any = createStoreModule(
    connectRouter(history)(mainReducers),
    composeEnhancers(
      applyMiddleware(routerMiddleware(history), sagaMiddleware),
    ),
  )

  sagaMiddleware.run(notifySagas)
  sagaMiddleware.run(rootSagas)
  sagaMiddleware.run(adminInsertSagas)
  sagaMiddleware.run(singleInsertSagas)
  sagaMiddleware.run(adminRepairSagas)

  return willReturn
}
