import React from 'react'
import { connect } from 'react-redux'
import { Grid, Cell } from '../../src/Grid/component'
import { increment } from './actions'

const contentCellProps = {
  evalStyled: 'outline: 1px solid grey',
  topLeft:{
    x:1,
    y:2,
  },
  height:28,
  width: 14,
}

const sidebarCellProps = {
  ...contentCellProps,
  evalStyled: 'outline: 1px solid green',
  topLeft:{
    x:16,
    y:1,
  },
}

const counterStep = 6

export class ObservableStarterComponent extends React.Component{
  constructor(props){
    super(props)
    this.increment = this.increment.bind(this)
  }

  increment(){
    this.props.dispatch(increment(counterStep))
  }

  render(){
    return (
      <Grid>
        <Cell {...contentCellProps}>
          <h2>{this.props.counter}</h2>
        </Cell>
        <Cell {...sidebarCellProps}>
          <div>
            <button type='button' onClick={this.increment}>+</button>
          </div>
        </Cell>
      </Grid>
    )
  }
}

const mapStateToProps = state => ({ counter: state.reducer })

export default connect(mapStateToProps)(ObservableStarterComponent)

