import * as React from 'react'
import { connect } from 'react-redux'
import { init } from './actions'

export class Selfrefactor extends React.Component<SelfrefactorProps, {}> {
  constructor(props: SelfrefactorProps) {
    super(props)
  }
  public componentDidMount(){
    this.props.dispatch(init())
  }
  public render() {
    return <div>
      Selfrefactor
    </div>
  }
}

const connectComponent = ({ store, SelfrefactorStore }) => ({ store, SelfrefactorStore })

export const SelfrefactorWrapped = connect(connectComponent)(Selfrefactor)
