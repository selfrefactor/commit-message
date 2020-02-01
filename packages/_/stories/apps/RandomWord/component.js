import { delay } from 'rambdax'
import React from 'react'
import { initialGetLocalize } from 'client-helpers'
import { Grid } from '../../src/Grid/component'
import { Options } from '../../src/Options/component'
import { getNewInstance } from './getNewInstance'
import { Inner } from './inner.js'

const BACKGROUND = '#ede8e1aa'
const RANDOM_WORD = 'random.word'

const ONLY_OLD = `${ RANDOM_WORD }.only.old`
const ANSWER_DELAY = `${ RANDOM_WORD }.answer.delay`
const SPEED = `${ RANDOM_WORD }.speed`
const MIN_LENGTH = `${ RANDOM_WORD }.min.length`
const MAX_LENGTH = `${ RANDOM_WORD }.max.length`

const onlyOldOption = {
  label: ONLY_OLD,
  type: 'TOGGLE',
  note: 'Set `only.old` mode to get already existing items',
  visibleLabel: 'Only old mode',
  value: initialGetLocalize({
    key: ONLY_OLD,
    defaultValue: true,
  }),
}

const answerDelayOption = {
  note:
    'Answer is visible after delay of how many seconds(0 to disable delay)',
  visibleLabel: 'Answer delay',
  label: ANSWER_DELAY,
  type: 'SLIDER',
  between: [ 0, 10 ],
  value: initialGetLocalize({
    key: ANSWER_DELAY,
    defaultValue: 5,
  }),
}

const speedOption = {
  visibleLabel: 'Speed',
  label: SPEED,
  type: 'SLIDER',
  between: [ 3, 60 ],
  value: initialGetLocalize({
    key: SPEED,
    defaultValue: 5,
  }),
}

const minLengthOption = {
  note: 'Minimum length of German word',
  visibleLabel: 'Minimum length',
  label: MIN_LENGTH,
  type: 'SLIDER',
  between: [ 4, 12 ],
  value: initialGetLocalize({
    key: MIN_LENGTH,
    defaultValue: 4,
  }),
}

const maxLengthOption = {
  note: 'Maximum length of German word',
  visibleLabel: 'Maximum length',
  label: MAX_LENGTH,
  type: 'SLIDER',
  between: [ 8, 26 ],
  value: initialGetLocalize({
    key: MAX_LENGTH,
    defaultValue: 17,
  }),
}

export class RandomWord extends React.Component{
  constructor(props){
    super(props)
    this.OPTIONS = [
      maxLengthOption,
      minLengthOption,
      onlyOldOption,
      speedOption,
    ]
    this.options = {
      maxLength: maxLengthOption.value,
      minLength: minLengthOption.value,
      onlyOld: onlyOldOption.value,
      speed: speedOption.value,
    }
    this.state = {
      show: false,
      instance: {},
    }
    this.work = this.work.bind(this)
    this.handleOptionsCallback = this.handleOptionsCallback.bind(this)
  }

  async work(){
    if (this.props.testInstance){
      return this.setState({
        show: true,
        instance: this.props.testInstance,
      })
    }
    const { speed, minLength, onlyOld, maxLength } = this.options
    const ms = speed * 1000
    const firstInstance = await getNewInstance({
      minLength,
      onlyOld,
      maxLength,
    })

    this.setState({
      instance: firstInstance,
      show: true,
    })

    while (true){
      const newInstance = await getNewInstance({
        minLength,
        onlyOld,
        maxLength,
      })

      if (!this.state.show){
        await delay(ms)
        continue
      }

      this.setState({ instance: newInstance })
      await delay(ms)
    }
  }

  handleOptionsCallback({ type }){
    if (type === 'UPDATE_ACTIVE'){
      return this.setState({ show: false })
    }
    if (type !== 'UPDATE_OPTIONS') return
    delay(500).then(() => window.location.reload(false))
  }

  componentDidMount(){
    this.work()
  }

  render(){
    const { instance, show } = this.state

    return (
      <Grid background={BACKGROUND}>
        <Options
          callback={this.handleOptionsCallback}
          keyBinding={this.props.optionsKeyBinding}
          label='speed.reader'
          options={this.OPTIONS}
        />
        {show ? Inner(instance) : null}
      </Grid>
    )
  }
}
