import { range } from 'rambdax'
import React from 'react'
import { delay, uuid } from 'rambdax'
import { Grid, Cell } from '../../src/Grid/component.js'
import { Options } from '../../src/Options/component.js'
import { initialGetLocalize } from 'client-helpers'

const speedOption = {
  label: 'speed.option',
  type: 'SLIDER',
  visibleLabel: 'Speed of interval',
  between: [ 4, 40 ],
  value: initialGetLocalize({
    key: 'speed.option',
    defaultValue: 12,
  }),
}

const fooStyled = `
  outline: 1px solid #951;
`

async function getDataMock(){
  await delay(323)

  return range(0, 6).map(() => uuid(6))
}

function Portrait(data){
  return (
    <React.Fragment>
      <Cell
        evalStyled={fooStyled}
        height={8}
        topLeft={{
          x: 3,
          y: 6,
        }}
        width={12}
      >
        {data[ 0 ]}
      </Cell>
    </React.Fragment>
  )
}

function Landscape(data){
  return (
    <React.Fragment>
      <Cell
        evalStyled={fooStyled}
        height={8}
        topLeft={{
          x: 3,
          y: 6,
        }}
        width={12}
      >
        {data[ 0 ]}
      </Cell>
    </React.Fragment>
  )
}

export class Foo extends React.Component{
  constructor(props){
    super(props)
    this.interval = null
    this.state = {
      data: [],
      ready: false,
    }
    this.portraitMode = window.innerHeight > window.innerWidth
    this.OPTIONS = [ speedOption ]
    this.handleOptionsCallback = this.handleOptionsCallback.bind(this)
  }

  async componentDidMount(){
    const result = await getDataMock()
    this.setState({
      data: result,
      ready: true,
    })
    this.interval = setInterval(() => {
      getDataMock().then(newSetWords => this.setState({ data: newSetWords }))
    }, speedOption.value * 1000)
  }

  componentWillUnmount(){
    if (!this.interval) return
    clearInterval(this.interval)
  }

  handleOptionsCallback({ type }){
    if (type !== 'UPDATE_OPTIONS') return
    delay(500).then(() => window.location.reload(false))
  }

  render(){
    const { data, ready } = this.state
    if (!ready || data.length !== 6) return null

    return (
      <Grid
        height={32}
        topLeft={{
          x: 0,
          y: 0,
        }}
        width={32}
      >
        <Options
          callback={this.handleOptionsCallback}
          keyBinding={this.props.optionsKeyBinding}
          label='joke.maker'
          options={this.OPTIONS}
        />
        {this.portraitMode ? Portrait(data) : Landscape(data)}
      </Grid>
    )
  }
}
