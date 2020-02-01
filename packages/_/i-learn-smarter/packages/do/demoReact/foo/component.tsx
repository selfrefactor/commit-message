import * as React from 'react'
import { connect } from 'react-redux'
import { init } from './actions'

export class Foo extends React.Component<FooProps, {}> {
  constructor(props: FooProps) {
    super(props)
  }
  public componentDidMount(){
    this.props.dispatch(init())
  }
  public render() {
    return <div>
      Foo
    </div>
  }
}

const connectComponent = ({ store, fooStore }) => ({ store, fooStore })

export const FooWrapped = connect(connectComponent)(Foo)
