import * as React from 'react'
import { randomSeed } from '../_helpers/randomSeed'
import { ADMIN_INSERT_READY } from '../constants'
import { delay, throttle } from 'rambdax'
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
    this.proceed = throttle(this.proceed.bind(this), 1000)
  }
  public proceed(){
    this.props.dispatch(remove())
  }
  // public keydown(e: KeyboardEvent) {
  //   if (e.key === 'ArrowRight') {
  //     this.props.dispatch(remove())
  //   }
  // }
  public componentDidMount() {
    this.props.dispatch({ type: ADMIN_INSERT_READY })
    // document.addEventListener('keydown', this.keydown)
  }
  // public componentWillUnmount() {
  //   document.removeEventListener('keydown', this.keydown)
  // }

  public create(index: number) {
    if(!allowClick) return
    const doc = this.props.adminInsertStore.currentInstance[index]
    allowClick = false
    
    this.props.dispatch(create(doc))
    delay(1000).then(() => allowClick = true)
  }

  public render() {
    const {
      currentInstance,
      loaded,
    } = this.props.adminInsertStore
    return (
      <div>
        {loaded && (
          <div className={`${_}__wrapper`}>

            {currentInstance.map(
              ({enPart, dePart}, i) => (
                <div 
                  className={`${_}__item`} 
                  key={randomSeed()}
                >
                  <div 
                    className={`${_}__item--text`}
                    onClick={() => { this.create(i) }}
                  >
                    <div>{dePart}</div>
                    <hr />
                    <div>{enPart}</div>
                  </div>
                </div>
              )
            )}

          </div>
        )}
        <div className='next__button' onClick={this.proceed}>
          ▶
        </div>

      </div>)
  }
}
