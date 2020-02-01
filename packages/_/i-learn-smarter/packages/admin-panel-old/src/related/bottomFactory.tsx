import * as React from 'react'
import { update } from '../admin_repair/actions'
import { customWord, definition, request } from './actions'

export function BottomFactory(props: any) {
  const isBG = props.mode === 'bg'
  const altButtonText = isBG ?
    'Въведи' :
    'Definition'

  const updateButtonText = isBG ?
    'Запази' :
    'Update'

  const method = isBG ?
    customWord :
    definition

  return (
    <React.Fragment key={props.mode}>
      <div>
        <button
          onClick={() => props.dispatch(request(props.mode))}
        >
          {props.mode.toUpperCase()}_related
        </button>
      </div>

      <div>
        <button
          onClick={() => props.dispatch(method(props.mode))}
        >
          {altButtonText}
        </button>
      </div>

      <div>
        <button
          onClick={() => props.dispatch(update())}
        >
          {updateButtonText}
        </button>
      </div>
    </React.Fragment>
  )
}
