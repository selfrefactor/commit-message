import { allTrue } from 'rambdax'
import {
  ADMIN_REPAIR_INPUT_CHANGE,
  ADMIN_REPAIR_READY,
} from '../constants'
import {
  changeMode,
  changeRandom,
  next,
  searchImage,
  toBulgarian,
  togglePC,
  update,
} from './actions'

import { classnames } from 'classnames'
import * as React from 'react'
import { Related } from '../related/component'
import { canSearchAnt } from './ants/canSearch'
import { changeModeAnt } from './ants/changeMode'
import { enterOnInputAnt } from './ants/enterOnInput'
import { getInputAnt } from './ants/getInput'
import { randomModeAnt } from './ants/randomMode'
import { NextButton } from './buttons'
import { ShowImages } from './showImages'

const style = { color: '#03111c' }
/**
 * array defining the variour parts of currentInstance
 */
const parts = ['dePart', 'enPart', 'bgPart', 'deWord', 'enWord', 'bgWord']

const inputClassFn = (x: string) => {
  return classnames({
    long: x.endsWith('Part'),
    short: x.endsWith('Word'),
  })
}

/**
 * how long are the small input fields
 */
const INPUT_LENGTH = 25

/**
 * how long should is the event path of keyboard event
 * when body element is on focus
 */
const PATH_LENGTH = 4
const base = 'adminrepair'

export class AdminRepair extends React.Component<AdminRepairProps, {}> {
  constructor(props: AdminRepairProps) {
    super(props)
    this.onInputChange = this.onInputChange.bind(this)
    this.keydown = this.keydown.bind(this)
    this.curryDispatch = this.curryDispatch.bind(this)
    this.searchImageInput = this.searchImageInput.bind(this)
  }

  public keydown(e: KeyEvent) {
    if (enterOnInputAnt(e)){
      this.props.dispatch(update())
    }else if (e.key === 'ArrowRight' && e.path.length === PATH_LENGTH) {
      this.props.dispatch(next())
    }
  }

  public searchImageInput(e: any) {
    if (canSearchAnt(e)) {
      this.props.dispatch(
        searchImage(e.target.value.trim()),
      )

      const x: any = document.getElementById('search-image')
      x.value = ''
    }
  }

  public onInputChange(keyword: string, event: any) {
    this.props.dispatch({
      payload: { [keyword]: event.target.value },
      type: ADMIN_REPAIR_INPUT_CHANGE,
    })
  }

  public curryDispatch(toDispatch: any, maybeInput?: any) {
    if (maybeInput === undefined){
      return () => this.props.dispatch(toDispatch())
    }
    return () => this.props.dispatch(toDispatch(maybeInput))
  }

  public componentDidMount() {
    this.props.dispatch({ type: ADMIN_REPAIR_READY })
    document.addEventListener('keydown', this.keydown)
  }

  public componentWillUnmount() {
    document.removeEventListener('keydown', this.keydown)
  }
  public render() {
    const {
      currentInstance,
      loaded,
      mode,
      randomFlag,
      showImages,
    } = this.props.adminRepairStore

    const pcFlag = currentInstance.pcFlag === true
    const pcIcon = pcFlag ? 'on' : 'off'

    const isRelated = mode === 'RELATED' && loaded
    const ok = mode !== 'RELATED' && loaded

    const changeModeClass = changeModeAnt(mode, loaded)
    const randomModeClass = randomModeAnt(randomFlag)

    const okImage = allTrue(
      !showImages,
      !isRelated,
      typeof currentInstance.imageSrc === 'string',
    )

    return (
      <div>
        {isRelated && <Related {...this.props} />}

        {ok &&
          <div className={base}>

            {/* Input group */}
            {
              parts.map(
                singlePart =>
                  <div
                    className={`${base}__${singlePart.toLowerCase()}`}
                    key={singlePart}
                  >
                    <input
                      className={inputClassFn(singlePart)}
                      onChange={e => this.onInputChange(singlePart, e)}
                      type='text'
                      placeholder={singlePart}
                      value={getInputAnt(currentInstance, singlePart)}
                    />
                  </div>
              )
            }

            {/* Search input */}
            <div className={`${base}__search`} >
              <input
                className='admin__input'
                id='search-image'
                onKeyPress={this.searchImageInput}
                placeholder='Search Image'
                size={INPUT_LENGTH}
                type='text'
              />
            </div>

            {/* Buttons */}
            <div className={`${base}__buttons`} >
              <div className={`${base}__buttons--grid`} >

                {/* Update instance */}
                <div>
                  <button
                    id='update_button'
                    type='button'
                    title='Update'
                    onClick={this.curryDispatch(update)}
                  >
                    <span style={{ color: '#3b8686' }}>
                      <i className='fa fa-paper-plane-o fa-2x' />
                    </span>
                  </button>
                </div>

                {/* Next instance */}
                <div>
                  <NextButton size="2" {...this.props} />
                </div>

                {/* Change between imageful, imageless and related mode */}
                <div>
                  <button
                    type='button'
                    title='Change repair mode'
                    onClick={this.curryDispatch(changeMode)}
                  >
                    <span style={style}>
                      <i className={changeModeClass} />
                    </span>
                  </button>
                </div>

                {/* Change to random order */}
                <div>
                  <button
                    type='button'
                    title='Toggle random order'
                    onClick={this.curryDispatch(changeRandom)}
                  >
                    <span style={style}>
                      <i className={randomModeClass} />
                    </span>
                  </button>
                </div>

                {/* PC flag */}
                <div>
                  <button
                    type='button'
                    title='Toggle PC approval'
                    onClick={this.curryDispatch(togglePC, !pcFlag)}
                  >
                    <span style={style}>
                      <i className={`fa fa-2x fa-toggle-${pcIcon}`} />
                    </span>
                  </button>
                </div>

                {/* Translate to Bulgarian */}
                <div>
                  <button
                    type='button'
                    title='Translate to Bulgarian'
                    onClick={this.curryDispatch(toBulgarian)}
                  >
                    <span style={style}>
                      <i className='fa fa-2x fa-bold' />
                    </span>
                  </button>
                </div>

              </div>

            </div>

            {/* Show images from Google search   */}
            {
              showImages && <ShowImages {...this.props} />
            }

            {/* Show instance's image if present   */}
            {
              okImage &&
              <div className={`${base}__image`}>
                <img src={currentInstance.imageSrc} />
              </div>
            }

          </div>
        }

      </div>
    )
  }

}
