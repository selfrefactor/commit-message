import * as React from 'react'
import { connect } from 'react-redux'
import { init } from './actions'
import { SelectArticle as SelectArticleComponent } from './selectArticle'

export class SelectArticle extends React.Component<SelectArticleProps, {}> {
  constructor(props: SelectArticleProps) {
    super(props)
  }
  public componentDidMount(){
    this.props.dispatch(init())
  }
  public render() {
    const { ready } = this.props.selectArticleStore

    return (
      <div>
        {ready && <SelectArticleComponent {...this.props} />}
      </div>
    )
  }
}

const connectComponent = ({ store, selectArticleStore }) =>
  ({ store, selectArticleStore })

export const SelectArticleWrapped = connect(connectComponent)(SelectArticle)
