import * as React from 'react'
import { connect } from 'react-redux'
import { InitialState } from './reducers'

interface ReduxAction {
  type: string
  payload?: any
}

interface Props {
  dispatch(input: ReduxAction): void
}

interface ReactNotificatorProps extends Props {
  notifyStore: InitialState
}

const connectNotifyStore = ({ notifyStore }) => ({ notifyStore })

class App extends React.Component<ReactNotificatorProps, {}> {
  constructor(props) {
    super(props)
  }

  public render() {
    const className = `notify__${this.props.notifyStore.className}`

    return (
      <div className='notify__wrapper'>
        <div className={className}>{this.props.notifyStore.message}</div>
      </div>
    )
  }
}

export const Notify = connect(connectNotifyStore)(App)
