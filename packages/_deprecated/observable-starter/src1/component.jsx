import React from 'react'
import { connect, Provider } from 'react-redux'
import {configureStore} from './createStore'

const ping = () => ({ type: 'PING' });

let App = ({ isPinging, ping }) => (
  <div>
    <h1>is pinging: {isPinging.toString()}</h1>
    <button onClick={ping}>Start PING</button>
  </div>
);

App = connect(
  ({ isPinging }) => ({ isPinging }),
  { ping }
)(App);


const store = configureStore();


export const Root =  (<Provider store={store}>
    <App />
</Provider>)
