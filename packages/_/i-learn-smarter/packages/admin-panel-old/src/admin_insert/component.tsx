import * as React from 'react'
import { delay } from 'rambdax'
import { randomSeed } from '../_helpers/randomSeed'
import { ADMIN_INSERT_READY } from '../constants'

import {
  create,
  remove,
} from './actions'

const _ = 'admin_insert'

let allowClick = true

export class AdminInsert extends React.Component<AdminInsertProps, {}> {
  constructor(props: AdminInsertProps) {
    super(props)
    this.create = this.create.bind(this)
    this.keydown = this.keydown.bind(this)
  }
  public keydown(e: KeyboardEvent) {
    if (e.key === 'ArrowRight') {
      this.props.dispatch(remove())
    }
  }
  public componentDidMount() {
    this.props.dispatch({ type: ADMIN_INSERT_READY })
    document.addEventListener('keydown', this.keydown)
  }
  public componentWillUnmount() {
    document.removeEventListener('keydown', this.keydown)
  }

  public create(doc: any, index: number) {
    if(!allowClick) return
    allowClick = false
    
    this.props.dispatch(create({
      doc,
      index,
    }))
    delay(1000).then(() => allowClick = true)
  }

  public render() {
    const {
      loaded,
      data,
      translated,
    } = this.props.adminInsertStore
    return (
      <div>
        {loaded && (
          <div className={`${_}__wrapper`}>

            {data.map(
              (val, i) => (
                <div 
                  className={`${_}__item`} 
                  key={randomSeed()}
                >
                  <div 
                    className={`${_}__item--text`}
                    onClick={() => { this.create(val, i) }}
                  >
                    <div>{val.dePart}</div>
                    <hr />
                    <div>{translated[i]}</div>
                  </div>
                </div>
              )
            )}

          </div>
        )}

      </div>)
  }
}
