import { darkblue } from 'colors'
import * as React from 'react'
import {navNext, navPrev} from '../related/actions'
import {changeMode, next} from './actions'

const buttonStyle = { color: darkblue }

function ButtonFactory(
  props: any,
  action: any,
  fa: string,
  size: number,
) {
  const className = `fa fa-${fa} fa-${size}x`

  return (
    <button
      type='button'
      title='To next instance'
      onClick={() => { props.dispatch(action(props.mode)) }}
    >
      <span style={buttonStyle}>
        <i className={className} />
      </span>
    </button>
  )
}

export function NextButton(props: any) {
  const size = props.size ?
    Number(props.size) :
    4

  return ButtonFactory(props, next, 'caret-right', size)
}

export function ModeButton(props: any) {
  return ButtonFactory(props, changeMode, 'cubes', 4)
}

export function RelatedNextButton(props: any) {
  return ButtonFactory(props, navNext, 'caret-right', 1)
}

export function RelatedPrevButton(props: any) {
  return ButtonFactory(props, navPrev, 'caret-left', 1)
}
