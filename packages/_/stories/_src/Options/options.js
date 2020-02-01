import {
  glue,
  partialCurry,
  change,
  nextIndex,
  prevIndex,
  findIndex,
} from 'rambdax'
import * as React from 'react'
import { setLocalize } from 'client-helpers'
import { Cell } from '../Grid/component.js'
import { SelectOption } from './internals/SelectOption'
import { InputOption } from './internals/InputOption'
import { ToggleOption } from './internals/ToggleOption'
import { CallbackOption } from './internals/CallbackOption'
import { SliderOption } from './internals/SliderOption'

const closeButtonPropsStyled = glue(`
    background: #498205;
    text-align:center;
    width: 100%;
    line-height: 6vh;  
    cursor: pointer;
    font-size: 3vh;  
`)

const navigationStyled = glue(`
    background: #847545;
    text-align:center;
    width: 90%;
    margin: 5%;
    line-height: 6vh;  
    cursor: pointer;
    font-size: 3vh;  
`)

function getVisibleOptions(options, perPage, page){
  return options.slice(page * perPage, page * perPage + perPage)
}

export class Options extends React.Component{
  constructor(props){
    super(props)
    this.PER_PAGE = 5
    this.LENGTH = props.allOptions.length
    this.SHOW_NAVIGATION = props.allOptions.length > this.PER_PAGE

    this.state = {
      allOptions: props.allOptions,
      expanded: false,
      expandedIndex: -1,
      page: 0,
    }
    this.handleNavigation = this.handleNavigation.bind(this)
    this.majorCallback = this.majorCallback.bind(this)
    this.turnInputActive = this.turnInputActive.bind(this)
    this.turnInputActiveFn = this.turnInputActiveFn.bind(this)
    this.handleClose = this.handleClose.bind(this)
  }

  handleClose(){
    this.props.handleClose(this.state.allOptions)
  }

  handleNavigation(e){
    const { page } = this.state
    const getNewIndex = e.target.id === 'next' ? nextIndex : prevIndex

    const newPage = getNewIndex(
      page,
      Array(Math.ceil(this.LENGTH / this.PER_PAGE))
    )
    this.setState({ page: newPage })
  }

  turnInputActive(i){
    if (this.state.expanded && this.state.expandedIndex === i){
      return this.setState({ expanded: false })
    }

    this.setState({
      expanded: true,
      expandedIndex: i,
    })
  }

  turnInputActiveFn(i){
    if (this.state.expanded && this.state.expandedIndex === i){
      return { expanded: false }
    }

    return {
      expanded: true,
      expandedIndex: i,
    }
  }

  majorCallback({ label, newValue, i }){
    const { allOptions } = this.state
    const foundIndex = findIndex(x => x.label === label, allOptions)
    const newState = change(
      this.state,
      `allOptions.${ foundIndex }.value`,
      newValue
    )

    this.setState({
      ...newState,
      ...(typeof newValue === 'boolean' ? {} : this.turnInputActiveFn(i)),
    })
    setLocalize(label, newValue)
  }

  render(){
    const { allOptions, page } = this.state
    const containerProps = {
      height: 32,
      evalStyled: 'z-index:1',
      subgridFlag: true,
      topLeft: {
        x: 0,
        y: 0,
      },
      width: 32,
    }

    const closeButtonProps = {
      width: 1,
      height: 1,
      topLeft: {
        y: 1,
        x: 15,
      },
      evalStyled: closeButtonPropsStyled,
      extraProps: { onClick: this.handleClose },
    }
    const prevPageProps = {
      width: 2,
      height: 1,
      topLeft: {
        y: 11,
        x: 5,
      },
      evalStyled: navigationStyled,
      extraProps: { onClick: this.handleNavigation },
    }
    const nextPageProps = {
      ...prevPageProps,
      topLeft: {
        y: 11,
        x: 7,
      },
      extraProps: {
        id: 'next',
        onClick: this.handleNavigation,
      },
    }

    const baseCellProps = {
      height: 2,
      evalStyled:
        'cursor:pointer;outline: solid #bdc3c7;text-align: center;line-height:5.2vh',
      topLeft: {
        x: 16,
        y: 1,
      },
      width: 13,
    }

    const Factory = OptionComponent => expandableProps => (
      <OptionComponent
        baseCellProps={baseCellProps}
        expandableProps={expandableProps}
        key={expandableProps.containerProps.key}
        majorCallback={this.majorCallback}
        turnInputActive={this.turnInputActive}
      />
    )

    const ToggleFn = partialCurry(ToggleOption, {
      baseCellProps,
      majorCallback: this.majorCallback,
    })
    const CallbackFn = partialCurry(CallbackOption, {
      baseCellProps,
      forceClose: this.props.forceClose,
    })
    const InputFn = Factory(InputOption)
    const SelectFn = Factory(SelectOption)
    const SliderFn = Factory(SliderOption)

    const visibleOptions = getVisibleOptions(
      allOptions,
      this.PER_PAGE,
      page
    )
    const AllOptions = visibleOptions.map((singleOption, i) => {
      const containerProps = {
        key: `option-row-${ i }`,
        height: 2,
        topLeft: {
          x: 0,
          y: Math.floor(1 + 2 * i),
        },
        width: 15,
        evalStyled: 'background: #fafaf5;outline: solid #282c34',
      }
      const canShow = this.state.expanded && this.state.expandedIndex === i
      const baseProps = {
        containerProps,
        singleOption,
      }
      const expandableProps = {
        ...baseProps,
        i,
        canShow,
      }
      switch (singleOption.type){
      case 'TOGGLE':
        return ToggleFn(baseProps)
      case 'SELECT':
        return SelectFn(expandableProps)
      case 'INPUT':
        return InputFn(expandableProps)
      case 'SLIDER':
        return SliderFn(expandableProps)
      case 'CALLBACK':
        return CallbackFn(expandableProps)
      default:
        console.warn('invalid input for `Options` component', arguments)

        return null
      }
    })

    return (
      <Cell {...containerProps}>
        {AllOptions}

        {!this.state.expanded && <Cell {...closeButtonProps}>X</Cell>}

        {this.LENGTH > this.PER_PAGE && (
          <React.Fragment>
            <Cell {...prevPageProps}>{'<'}</Cell>
            <Cell {...nextPageProps}>{'>'}</Cell>
          </React.Fragment>
        )}
      </Cell>
    )
  }
}
