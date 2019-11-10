import * as React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

export class Navigation extends React.Component<Props, {}> {
  private base: string

  constructor(props: Props) {
    super(props)
    this.base = 'navigation'
  }

  public render() {
    return <div>
      {this.props.store.navigationActive && <div className={`${this.base}__container`}>
        <div className={`${this.base}`}>

          <div className={`${this.base}__item--fourth`}>
            <span><Link to='/foo'>Foo</Link></span>
          </div>

          <div className={`${this.base}__item--fifth`}>
            <span><Link to='/'>Home</Link></span>
          </div>

        </div>
      </div>}

    </div>
  }
}

const connectComponent = ({ store }) => ({ store })

export const NavigationWrapped = connect(connectComponent)(Navigation)
