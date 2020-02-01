import { pascalCase } from 'string-fn'
import { getter, ok, setter } from 'rambdax'
import * as React from 'react'
import { Options as OptionsComponent } from './options.js'

function createKeyBinding({ label, callback, firstKey, secondKey }){
  ok(label, callback, firstKey, secondKey)(
    String,
    'function',
    String,
    String
  )

  return ({ key }) => {
    if (key === firstKey){
      return setter(label, true)
    } else if (key === secondKey && getter(label)){
      callback()

      return setter(label, false)
    } else if (!getter(label)){
      return setter(label, false)
    }
  }
}

export class Options extends React.Component{
  constructor(props){
    super(props)
    ok(props)({
      options: Array,
      label: String,
      callback: Function,
    })

    this.eventHolder = null
    this.forceClose = this.forceClose.bind(this)
    this.listener = this.listener.bind(this)
    this.handleClose = this.handleClose.bind(this)

    this.state = { active: false }
  }

  handleClose(newOptions){
    this.props.callback({
      type: 'UPDATE_OPTIONS',
      payload: { newOptions },
    })
    this.setState({ active: false })
  }

  componentDidMount(){
    const [ firstKey, secondKey ] = this.props.keyBinding ?
      this.props.keyBinding :
      [ 'Alt', 'o' ]

    this.eventHolder = createKeyBinding({
      label: `${ this.props.label }.options.alt.o`,
      firstKey: pascalCase(firstKey),
      secondKey: secondKey,
      callback: this.listener,
    })
    document.addEventListener('keydown', this.eventHolder)
  }

  componentWillUnmount(){
    if (!this.eventHolder) return
    document.removeEventListener('keydown', this.eventHolder)
  }

  listener(){
    const newActive = !this.state.active
    if (newActive){
      this.props.callback({ type: 'UPDATE_ACTIVE' })
    }
    this.setState({ active: newActive })
  }

  forceClose(){
    this.setState({ active: false })
  }

  render(){
    if (!this.state.active) return null

    return (
      <OptionsComponent
        allOptions={this.props.options}
        forceClose={this.forceClose}
        handleClose={this.handleClose}
      />
    )
  }
}

export default Options
