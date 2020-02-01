import * as React from 'react'
import { initialGetLocalize } from 'client-helpers'
import { Grid } from '../Grid/component.js'

import { Options } from './component'

const fooOption = {
  label: 'foo',
  type: 'TOGGLE',
  value: initialGetLocalize({
    key: 'foo',
    defaultValue: true,
  }),
}
const aOption = {
  label: 'a',
  type: 'TOGGLE',
  value: initialGetLocalize({
    key: 'a',
    defaultValue: true,
  }),
}
const bOption = {
  label: 'b',
  type: 'TOGGLE',
  value: initialGetLocalize({
    key: 'b',
    defaultValue: true,
  }),
}
const cOption = {
  label: 'c',
  type: 'TOGGLE',
  value: initialGetLocalize({
    key: 'c',
    defaultValue: true,
  }),
}
const barOption = {
  label: 'bar',
  type: 'TOGGLE',
  value: initialGetLocalize({
    key: 'bar',
    defaultValue: false,
  }),
}
const bazOption = {
  label: 'baz',
  type: 'SELECT',
  choices: [ 'udi.alan', 'nitzshe1', 'nitzshe2' ],
  value: initialGetLocalize({
    key: 'baz',
    defaultValue: 'udi.alan',
  }),
}
const inputOption = {
  label: 'foo.input',
  type: 'INPUT',
  value: initialGetLocalize({
    key: 'foo.input',
    defaultValue: '',
  }),
}
const sliderOption = {
  label: 'bar.slider',
  type: 'SLIDER',
  between: [ 1, 20 ],
  value: initialGetLocalize({
    key: 'bar.slider',
    defaultValue: 3,
  }),
}
const callbackOption = {
  label: 'bar.callback',
  visibleLabel: 'Start a callback bar',
  type: 'CALLBACK',
  callback: () => {
    console.log('callback')
  },
}

export class OptionsComplete extends React.Component{
  constructor(props){
    super(props)
    this.OPTIONS = [ callbackOption, inputOption, sliderOption ]
    this.handleOptionsUpdate = this.handleOptionsUpdate.bind(this)
    this.state = { options: this.OPTIONS }
  }

  handleOptionsUpdate({ type, action }){
    console.log(
      {
        type,
        action,
      },
      'OPTIONS are changed'
    )
  }

  render(){
    return (
      <Grid>
        <Options
          callback={this.handleOptionsUpdate}
          keyBinding={this.props.keyBinding}
          label='storybook.options'
          options={this.state.options}
        />
        <div>
          <div>Open OPTIONS with `Alt+y`</div>
        </div>
      </Grid>
    )
  }
}
