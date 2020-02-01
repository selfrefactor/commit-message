import { delay } from 'rambdax'
import React from 'react'
import { connect } from 'react-redux'
import { Grid, Cell } from '../../src/Grid/component'
import { Options } from '../../src/Options/component'
import { nextFromUser } from './actions'
import { autoOption, speedOption, tagsOption, batchSizeOption } from './options'

export class StackOverflowerComponent extends React.Component{
  constructor(props){
    super(props)
    this.OPTIONS = [
      tagsOption,
      autoOption,
      speedOption,
      batchSizeOption,
    ]
    this.handleOptionsChange = this.handleOptionsChange.bind(this)
    this.intervalHolder = null
    this.nextFromUser = this.nextFromUser.bind(this)
  }

  handleOptionsChange({ type }){
    if (type !== 'UPDATE_OPTIONS') return
    delay(500).then(() => window.location.reload(false))
  }

  nextFromUser(){
    this.props.dispatch(nextFromUser())
  }

  componentDidMount(){
    if (!this.props.production) return
    const child = document.createElement('div')
    const childSecond = document.createElement('div')
    child.id = 'portal'
    childSecond.id = 'portal-second'
    document.body.appendChild(child)
    document.body.appendChild(childSecond)

    this.props.dispatch({ type: 'INIT' })
    const { dispatch } = this.props

    if (autoOption.value){
      this.intervalHolder = setInterval(() => {
        dispatch({ type: 'NEXT_FROM_INTERVAL' })
      }, speedOption.value * 1000)
    }

  }

  componentWillUnmount(){
    if (!this.intervalHolder) return
    this.intervalHolder = null
  }

  render(){
    const { ready, currentIndex, data } = this.props.store
    if (!ready) return null
    const currentInstance = data[ currentIndex ]
    const { link, accepted_answer_id } = currentInstance

    const answer = `${ link }/${ accepted_answer_id }#${ accepted_answer_id }`

    const toRender = () => (
      <React.Fragment>
        <Cell
          evalStyled='width:100%;z-index:1000;'
          height={2}
          topLeft={{
            x: 11,
            y: 0,
          }}
          width={2}
        >
          <div className='overflow__button' onClick={this.nextFromUser}>
            <div>Next</div>
          </div>

        </Cell>

        <Cell
          evalStyled='width:100%;z-index:1000;'
          height={2}
          topLeft={{
            x: 23,
            y: 0,
          }}
          width={4}
        >
          <div className='button'>
            <div>
              <a href={answer} target='blank'>
              Link
              </a>
            </div>
          </div>
        </Cell>

      </React.Fragment>
    )

    return (
      <Grid>
        <Options
          callback={this.handleOptionsChange}
          keyBinding={this.props.optionsKeyBinding}
          label='stack.overflower'
          options={this.OPTIONS}
        />
        {toRender()}
      </Grid>
    )
  }
}

const mapStateToProps = state => ({ store: state.reducer })

export default connect(mapStateToProps)(StackOverflowerComponent)

