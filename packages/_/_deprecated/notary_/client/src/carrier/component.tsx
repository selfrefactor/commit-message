import * as React from 'react'
import { connect } from 'react-redux'
import { toggle } from './actions'

/**
 * Carrier component provides the base container, which holds navigation, icons, etc.
 *
 * @export
 * @class Carrier
 * @extends {React.Component<Props, {}>}
 */
export class Carrier extends React.Component<Props, {}> {
  private base: string

  constructor(props: Props) {
    super(props)
    this.base = 'carrier'
  }

  public render() {
    return <div className={`${this.base}__container`}>
      <div className={`${this.base}`}>

        <div className={`${this.base}__logo`} onClick={() => this.props.dispatch(toggle())}>
          &#9776;
        </div>

        <div className={`${this.base}__random`} id='next'>
          next
        </div>

        <div className={`${this.base}__points`}>
          points
        </div>

      </div>
    </div>
  }
}

const connectComponent = ({ store }) => ({ store })

export const CarrierWrapped = connect(connectComponent)(Carrier)
