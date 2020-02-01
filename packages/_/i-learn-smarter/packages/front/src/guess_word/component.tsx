import * as React from 'react'
import { connect } from 'react-redux'
import { init } from './actions'
import { GuessWord } from './guessWord'

class GuessWordComponent extends React.PureComponent<GuessWordProps, {}> {
  public componentDidMount() {
    this.props.dispatch(init())
  }
  public render() {
    const { ready } = this.props.guessWordStore

    return (
      <div>
        {ready && <GuessWord {...this.props} />}
      </div>
    )
  }
}

const connector = ({ store, guessWordStore }) => ({ store, guessWordStore })

export const GuessWordWrapped = connect(connector)(GuessWordComponent)
