import * as React from 'react'
import styled from 'styled-components'
import { delay, defaultTo, repeat, dropLast } from 'rambdax'

export class TestCell extends React.Component{
  constructor(props){
    super(props)
    this.ref = React.createRef()
    this.Container = styled.div`
      font-size: ${ defaultTo('1.5vh', props.fontSize) } !important;
      background: #fafafa;
      color: #111;
      ${ props.evalStyled ? props.evalStyled : '' }
    `
    this.step = 1
    this.TEST_CELL = defaultTo('TEST_CELL', props.localStorageItem)
    this.shouldProceed = !localStorage.getItem(this.TEST_CELL)

    this.state = { testString: repeat('_', props.start).join`` }
    this.work = this.work.bind(this)
    this._setState = this._setState.bind(this)
  }

  componentDidMount(){
    if (this.shouldProceed){
      this.work()
    }
  }

  async work(){
    while (true){
      const okWidth = this.checkElement()
      if (okWidth){
        localStorage.setItem(this.TEST_CELL, this.state.testString.length)

        return window.location.reload(true)
      }

      await delay(50)

      const testString = dropLast(this.step, this.state.testString)

      await this._setState({ testString })
    }
  }

  checkElement(){
    const el = this.ref.current

    return el.scrollWidth <= el.clientWidth
  }

  render(){
    if (!this.shouldProceed) return null

    return (
      <this.Container ref={this.ref}>
        {this.state.testString}
      </this.Container>
    )
  }

  _setState(newState){
    return new Promise(resolve => {
      this.setState(newState, resolve)
    })
  }
}
