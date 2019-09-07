import React from 'react';
import { connect } from 'react-redux';
import {updateCounter} from '../actions/counterActions'

//The value that the counter will increase/decrease per click
const counterStep = 1

const CounterComponent = (props) => {
  return(
            <div>
                <h2>{props.counter}</h2>
                <button type='button' onClick={props.decrement}>-</button>
                <button type='button' onClick={props.increment}>+</button>
            </div>
  )
}

const mapStateToProps = (state) => {
    return {
      counter: state.counterReducer
    }
  }

const mapDispatchToProps = (dispatch) => {
    return {
        increment: () => {
        dispatch(updateCounter(counterStep))
        },
        decrement: () => {
        dispatch(updateCounter(-counterStep))
        }
    }
}

  export default connect(mapStateToProps,mapDispatchToProps)(CounterComponent)
    

