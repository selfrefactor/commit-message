import * as React from 'react'
import { barInc } from '../actions'

export function Bar({ store, dispatch }){
  return (
    <div>
      Count: {store.counter}
      <button onClick={ () => dispatch(barInc()) }>+</button>
    </div>
  )
}
