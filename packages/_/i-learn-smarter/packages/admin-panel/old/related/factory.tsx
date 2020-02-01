import { splitEvery, switcher, type } from 'rambdax'
import * as React from 'react'
import { randomSeed } from '../_helpers/randomSeed'

const greater = y => x => x > y

import {
  RelatedNextButton,
  RelatedPrevButton,
} from '../admin_repair/buttons'

import { select, translate } from './actions'
import * as Styled from './styled'
import { RelatedNav } from './styled'

let hoverFlag = false
let timeout = null
const MOUSE_ENTER = 700

function CellFactory(props: RelatedCell) {
  const key = switcher<string>(props.x.length)
    .is(greater(50), 'CellLongText')
    .is(greater(15), 'CellMiddleText')
    .default('Cell')

  const CellComponent = Styled[key]
  const onClick = () => props.dispatch(
    select({ [props.mode]: props.x }),
  )

  function mouseEnter() {
    if (props.mode !== 'de' || hoverFlag) {

      return
    }

    hoverFlag = true

    timeout = setTimeout(() => {
      hoverFlag = false
      props.dispatch(translate(props.x))
    }, MOUSE_ENTER)
  }

  function mouseLeave() {
    if (props.mode !== 'de') {

      return
    }

    /**
     * User leaves before MOUSE_ENTER time is passed
     */
    if (hoverFlag) {
      hoverFlag = false

      /**
       * Needed because in initial state timeout is null
       */
      if (timeout !== null) {
        clearTimeout(timeout)
      }

      return
    }
  }

  return (
    <CellComponent
      onMouseEnter={mouseEnter}
      onMouseLeave={mouseLeave}
      onClick={onClick}
    >
      {props.x}
    </CellComponent>
  )
}

function Suggestions(props: Related) {
  const mode = props.mode
  const suggestions = props.adminRepairStore.related[mode]

  const splitIndex = props.adminRepairStore.related[`${mode}Index`]
  const splitted = splitEvery(5, suggestions)

  const fail = splitIndex >= splitted.length

  if (fail) {
    console.warn(splitted, 'suggestion')

    return null
  }

  return (
    <React.Fragment>
      <React.Fragment>{
        splitted[splitIndex].map(
          (x: string) => <CellFactory
            {...props}
            key={randomSeed()}
            x={x}
          />,
        )
      }</React.Fragment>
      <RelatedNav>
        <RelatedPrevButton {...props} />
        <RelatedNextButton {...props} />
      </RelatedNav>
    </React.Fragment>
  )
}

function Related(props: Related) {
  const {
    currentInstance,
    related,
  } = props.adminRepairStore
  const mode = props.mode

  const key = `${mode}Related`
  const indexKey = `${mode}Index`
  const dbRelated = currentInstance[key]
  const splitted = splitEvery<string>(5, dbRelated)
  const splitIndex = related[indexKey]

  if (splitIndex >= splitted.length) {

    return null
  }

  return (
    <React.Fragment>

      <React.Fragment>{
        splitted[splitIndex].map(
          x => <CellFactory {...props} x={x} key={randomSeed()} />,
        )
      }</React.Fragment>

      <RelatedNav>
        <RelatedPrevButton {...props} />
        <RelatedNextButton {...props} />
      </RelatedNav>

    </React.Fragment>
  )
}

export function Factory(props: Related) {
  const {
    currentInstance,
    relatedMode,
    related,
  } = props.adminRepairStore

  const mode = props.mode
  const show = relatedMode === 'SHOW'
  const dbRelated = currentInstance[`${mode}Related`]

  return <React.Fragment>
    {
      show &&
      dbRelated &&
      <Related {...props} />
    }

    {
      !show &&
      type(related[mode]) === 'Array' &&
      related[mode].length > 0 &&
      <Suggestions {...props} />
    }
  </React.Fragment>
}
