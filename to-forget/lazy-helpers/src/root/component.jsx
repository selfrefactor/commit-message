import { createAction } from '../createAction'
import * as React from 'react'
import { prepend } from 'rambdax'
import { titleCase } from 'string-fn'
import { BufferComponent } from '../buffer/component'
import { ChanceSettings } from '../change_settings/component'
import { GENERIC_CLICK_NEXT } from '../constants'
import {
  ADD_TO_BUFFER,
  BUTTON_CLICK,
  CHANGE_SETTINGS,
  CLOSE,
  GOOGLE_IMAGE,
  IMGUR,
  MAIN,
  SET_CANCEL,
  SLOW_SCROLL,
} from '../constants'

const base = 'lazy-helpers'
const item = `${base}__grid--item`

export class Root extends React.Component {
  constructor(props) {
    super(props)
    this.onButtonClick = this.onButtonClick.bind(this)
    this.buttons = process.env.LAZY_HELPERS === 'public' ?
      [CHANGE_SETTINGS, CLOSE] :
      [CHANGE_SETTINGS, ADD_TO_BUFFER, CLOSE]

    this.timeComponents = [SLOW_SCROLL, IMGUR, GOOGLE_IMAGE, GENERIC_CLICK_NEXT]
  }

  onButtonClick(buttonType) {
    return ()=> {
      if (this.timeComponents.includes(buttonType)) {
  
        this.props.dispatch({ type: `${buttonType}_SUBMIT` })
      } else {
  
        this.props.dispatch(
          createAction(BUTTON_CLICK, buttonType)
        )
      }
    }
  }
  componentDidMount() {
    document.body.addEventListener('keydown', event => {
      if (event.key === 'Escape') {
        this.props.dispatch({ type: SET_CANCEL })
      }
    })
  }

  render() {
    const {
      componentFlag, 
      timeComponent
    } = this.props.rootStore
    const okBuffer = componentFlag === ADD_TO_BUFFER
    const okSettings = componentFlag === CHANGE_SETTINGS
    const okMain = componentFlag === MAIN

    return (
    <div>
      {okSettings && <ChanceSettings {...this.props} />}

      {okBuffer && <BufferComponent {...this.props} />}

      {
        okMain &&
        <div className={`${base}__container`}>
          <div className={`${base}__grid`}>
            
            {prepend(timeComponent, this.buttons).map(
              button => {
                const buttonFn = this.onButtonClick(button)
                
                return (
                  <div className={item} key={button}>
                    <button onClick={buttonFn}>
                      {titleCase(button)}
                    </button>
                  </div>
                )
              }
            )}

          </div>
        </div>
      }

    </div>
  )}
}
