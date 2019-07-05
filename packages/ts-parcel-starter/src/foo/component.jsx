import * as React from 'react'
import { fooInc } from '../actions'

export function Foo({ store, dispatch }){
  return (
    <div>
      Count: {store.counter}
      <button onClick={ () => dispatch(fooInc()) }>+</button>
      <button onClick={ () => dispatch(fooInc()) }>-</button>
    </div>
  )
}
