import React from 'react'
import { glue } from 'rambdax'
import { Cell, Grid } from '../../Grid/component.js'
import { InputWithInitial } from './InputWithInitial'

export class InputOption extends React.Component{
  constructor(props){
    super(props)
    this.onBlur = this.onBlur.bind(this)
  }

  onBlur(newValue){
    this.props.majorCallback({
      ...this.props.expandableProps.singleOption,
      newValue,
      i: this.props.expandableProps.i,
    })
  }

  render(){
    const background = this.props.expandableProps.canShow ?
      '#25a' :
      '#4334'

    const cellProps = {
      ...this.props.baseCellProps,
      evalStyled: glue(`
      background: ${ background };
      ${ this.props.baseCellProps.evalStyled }
    `),
    }
    const inputProps = {
      height: 2,
      topLeft: {
        x: 1,
        y: 1,
      },
      width: 7,
    }
    const { singleOption, containerProps } = this.props.expandableProps

    const label = singleOption.visibleLabel ?
      singleOption.visibleLabel :
      singleOption.label

    return (
      <Cell {...containerProps}>
        <div>
          <Grid>
            {this.props.expandableProps.canShow && (
              <Cell {...inputProps}>
                <InputWithInitial
                  initialValue={singleOption.value}
                  onBlur={this.onBlur}
                />
              </Cell>
            )}
            <Cell
              {...cellProps}
              extraProps={{
                onClick: () =>
                  this.props.turnInputActive(this.props.expandableProps.i),
              }}
            >
              {label}
              {' : '}
              {singleOption.value}
            </Cell>
          </Grid>
        </div>
      </Cell>
    )
  }
}
