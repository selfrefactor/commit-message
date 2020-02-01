import React, { Component } from 'react'
import { Provider } from 'react-redux'
import configureStore from './configureStore'

import ObservableStarter from './component'

const store = configureStore()

export class ObservableStarterComplete extends Component{
  render(){
    return (
      <Provider store={store}>
        <ObservableStarter />
      </Provider>
    )
  }

  mapStateToProps = state => ({ counter: state.counterReducer })

  mapDispatchToProps = dispatch => ({
    increase: () => {
      dispatch({ type: 'INCREASE' })
    },
  })
}

