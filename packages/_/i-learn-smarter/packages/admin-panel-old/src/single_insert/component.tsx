import {
  create,
  inputChange,
  translatePart,
  translateWord,
} from './actions'

import { take } from 'rambdax'
import * as React from 'react'

const NUM_CHARS_AS_LABEL = 2

/**
 * Create input component
 *
 * self - this reference
 * mode - which part of DBInstance we are setting
 * onClick - which component method to call with `mode`
 * icon - FontAwesome icon
 * color - icon color
 */
// tslint:disable-next-line
function Input({ self, mode, onClick, icon, color }) {
  return <React.Fragment>
    <div className={`${self.base}__item`}>
      <div className={`${self.base}__button--container`}>

        <span className={`${self.base}__button--label`}>
          {(take(NUM_CHARS_AS_LABEL, mode) as any).toUpperCase()}
        </span>

        <button
          type='button'
          onClick={() => self[onClick](mode)}
        >
          <span style={{ color }}>
            <i className={`fa fa-${icon} fa-2x`} />
          </span>
        </button>

      </div>
    </div>

    <div className={`${self.base}__item`}>
      <div className={`${self.base}__input--container`}>
        <input
          type='text'
          placeholder={mode}
          id={`singleInsert@${mode}`}
          onChange={e => self.inputChange(e, mode)}
          value={self.props.singleInsertStore[mode]}
        />
      </div>
    </div>
  </React.Fragment>
}

export class SingleInsert extends React.Component<SingleInsertProps, {}> {
  private base: string

  constructor(props: SingleInsertProps) {
    super(props)
    this.base = 'single_insert'
    this.createRequestClick = this.createRequestClick.bind(this)
    this.translateRequestClick = this.translateRequestClick.bind(this)
    this.doubleClick = this.doubleClick.bind(this)
    this.inputChange = this.inputChange.bind(this)
  }
  public doubleClick(e: Event) {
    const computedName = (e.srcElement as any).computedName
    if (computedName === 'enPart') {
      const selectedText = window.getSelection().toString()
      this.props.dispatch(inputChange({ newValue: selectedText, mode: 'enWord' }))
    }
  }
  public inputChange(e: React.KeyboardEvent<string>, mode: string) {
    const value = (e.target as HTMLInputElement).value
    this.props.dispatch(inputChange({ newValue: value, mode }))
  }
  public translateRequestClick(mode: string) {
    if (mode.toLowerCase().endsWith('word')) {
      this.props.dispatch(translateWord())
    }

    if (mode.toLowerCase().endsWith('part')) {
      this.props.dispatch(translatePart())
    }
  }
  public componentDidMount() {
    // tslint:disable-next-line
    document.addEventListener('dblclick', this.doubleClick)
  }
  public componentWillUnmount() {
    // tslint:disable-next-line
    document.removeEventListener('dblclick', this.doubleClick)
  }
  public createRequestClick() {
    this.props.dispatch(create())
  }

  public render() {
    return (
      <div className={this.base}>

        {/* ENPART */}
        <Input
          color='#3b8686'
          icon='refresh'
          mode='enPart'
          onClick='translateRequestClick'
          self={this}
        />

        {/* DEPART */}
        <Input
          color='#e65e75'
          icon='paper-plane-o'
          mode='dePart'
          onClick='createRequestClick'
          self={this}
        />

        {/* BGPART */}
        <Input
          color='#e65e75'
          icon='paper-plane-o'
          mode='bgPart'
          onClick='createRequestClick'
          self={this}
        />

        {/* ENWORD */}
        <Input
          color='#3b8686'
          icon='refresh'
          mode='enWord'
          onClick='translateRequestClick'
          self={this}
        />

        {/* DEWORD */}
        <Input
          color='#e65e75'
          icon='paper-plane-o'
          mode='deWord'
          onClick='createRequestClick'
          self={this}
        />

        {/* DEPART */}
        <Input
          color='#e65e75'
          icon='paper-plane-o'
          mode='bgWord'
          onClick='createRequestClick'
          self={this}
        />

      </div>)
  }

}
