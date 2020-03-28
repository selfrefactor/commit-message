import './root/style.css'

import * as React from 'react'
import { connect, Provider } from 'react-redux'
import { createStore } from './createStore'

import { Root } from './root/component'

const connectFn = x => input => ({ [x]: input[x] })

const RootWrapped = connect(connectFn('rootStore'))(Root)

export const store = createStore()

export const RootApp = () => (
  <Provider store={store}>
    <RootWrapped />
  </Provider>
)

