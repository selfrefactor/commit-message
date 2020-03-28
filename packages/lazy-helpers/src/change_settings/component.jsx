import { createAction } from 'create-action'
import * as React from 'react'
import {
  RESET,
  SET_TIME_VALUE,
  TIME_COMPONENT_VALUE,
} from '../constants'
const base = 'lazy-helpers'

export class ChanceSettings extends React.Component{
  constructor(props) {
    super(props)
    this.onRangeInput = this.onRangeInput.bind(this)
    this.onButtonClick = this.onButtonClick.bind(this)
  }

  onButtonClick() {
    this.props.dispatch({ type: RESET })
  }

  onRangeInput(event) {
    localStorage.setItem(TIME_COMPONENT_VALUE, event.target.value)

    this.props.dispatch(createAction(SET_TIME_VALUE, event.target.value))
  }

  render() {
    return (
      <div className={`${base}__container`}>
        <div className={`${base}__grid`}>

          <div className={`${base}__settings`}>
            Time component value - {this.props.rootStore.timeComponentValue}
          </div>

          <div className={`${base}__grid--item`}>

            <input
              type='range'
              className='time-component'
              onChange={this.onRangeInput}
              value={this.props.rootStore.timeComponentValue}
              min='1'
              max='100'
              step='1'
            />

          </div>

          <div className={`${base}__grid--item`}>
            <button
              onClick={this.onButtonClick}
            >
              Back
          </button>
          </div>
        </div>
      </div>
    )
  }
}
