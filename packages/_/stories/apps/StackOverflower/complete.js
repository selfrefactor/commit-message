import React, { Component } from 'react'
import { Provider } from 'react-redux'
import configureStore from './configureStore'
import StackOverflower from './component'

const store = () => configureStore()

export class StackOverflowerComplete extends Component{

  render(){
    return (
      <Provider store={store()}>
        <StackOverflower {...this.props} />
      </Provider>
    )
  }
}

